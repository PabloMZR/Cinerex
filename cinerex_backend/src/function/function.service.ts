import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, Not } from 'typeorm';
import { CreateFunctionDto } from './dto/create-function.dto';
import { UpdateFunctionDto } from './dto/update-function.dto';
import { Function } from './entities/function.entity';
import { Movie } from '../movies/entities/movie.entity';
import { CinemaRoom } from '../cinema-room/entities/cinema-room.entity';
import { FunctionSeat } from './entities/function-seat.entity';
import { Seat } from '../seats/entities/seat.entity';

@Injectable()
export class FunctionService {
  constructor(
    @InjectRepository(Function)
    private readonly functionRepository: Repository<Function>,
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @InjectRepository(CinemaRoom)
    private readonly cinemaRoomRepository: Repository<CinemaRoom>,
    @InjectRepository(FunctionSeat)
    private readonly functionSeatRepository: Repository<FunctionSeat>,
    @InjectRepository(Seat)
    private readonly seatRepository: Repository<Seat>,
  ) {}

  async create(createFunctionDto: CreateFunctionDto): Promise<Function> {
    const { movieId, cinemaRoomId, startTime, endTime, price } = createFunctionDto;

    // Verificar que la película existe
    const movie = await this.movieRepository.findOne({
      where: { id: movieId }
    });
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    // Verificar que la sala existe y cargar sus asientos
    const cinemaRoom = await this.cinemaRoomRepository.findOne({
      where: { id: cinemaRoomId },
      relations: ['seats']
    });
    if (!cinemaRoom) {
      throw new NotFoundException('Cinema room not found');
    }

    // Verificar que no haya otra función en la misma sala en el mismo horario
    const startDate = new Date(startTime);
    const endDate = endTime ? new Date(endTime) : new Date(startDate.getTime() + movie.duration * 60000);

    const overlappingFunction = await this.functionRepository.findOne({
      where: {
        cinemaRoom: { id: cinemaRoomId },
        startTime: Between(startDate, endDate),
        status: 'active'
      }
    });

    if (overlappingFunction) {
      throw new BadRequestException('There is already a function scheduled at this time in this cinema room');
    }

    // Crear la función
    const function_ = this.functionRepository.create({
      movie,
      cinemaRoom,
      startTime: startDate,
      endTime: endDate,
      price,
      status: 'active'
    });

    await this.functionRepository.save(function_);

    // Crear los asientos de la función
    const functionSeats = cinemaRoom.seats.map(seat => {
      return this.functionSeatRepository.create({
        function: function_,
        seat: seat,
      });
    });

    await this.functionSeatRepository.save(functionSeats);

    // Retornar la función con todos sus datos
    return this.findOne(function_.id);
  }

  async findAll(): Promise<Function[]> {
    return this.functionRepository.find({
      relations: ['movie', 'cinemaRoom', 'functionSeats', 'functionSeats.seat'],
      order: {
        startTime: 'ASC'
      }
    });
  }

  async findOne(id: number): Promise<Function> {
    const function_ = await this.functionRepository.findOne({
      where: { id },
      relations: ['movie', 'cinemaRoom', 'functionSeats', 'functionSeats.seat']
    });

    if (!function_) {
      throw new NotFoundException(`Function with ID ${id} not found`);
    }

    return function_;
  }

  async update(id: number, updateFunctionDto: UpdateFunctionDto): Promise<Function> {
    const function_ = await this.findOne(id);
    
    if (updateFunctionDto.movieId) {
      const movie = await this.movieRepository.findOne({
        where: { id: updateFunctionDto.movieId }
      });
      if (!movie) {
        throw new NotFoundException('Movie not found');
      }
      function_.movie = movie;
    }

    if (updateFunctionDto.cinemaRoomId) {
      const cinemaRoom = await this.cinemaRoomRepository.findOne({
        where: { id: updateFunctionDto.cinemaRoomId },
        relations: ['seats']
      });
      if (!cinemaRoom) {
        throw new NotFoundException('Cinema room not found');
      }

      // Si cambia la sala, crear nuevos asientos para la función
      await this.functionSeatRepository.delete({ function: { id: function_.id } });
      
      const functionSeats = cinemaRoom.seats.map(seat => {
        return this.functionSeatRepository.create({
          function: function_,
          seat: seat,
        });
      });

      await this.functionSeatRepository.save(functionSeats);
      function_.cinemaRoom = cinemaRoom;
    }

    // Actualizar otros campos
    if (updateFunctionDto.startTime) {
      function_.startTime = new Date(updateFunctionDto.startTime);
    }
    if (updateFunctionDto.endTime) {
      function_.endTime = new Date(updateFunctionDto.endTime);
    }
    if (updateFunctionDto.price !== undefined) {
      function_.price = updateFunctionDto.price;
    }
    if (updateFunctionDto.status) {
      function_.status = updateFunctionDto.status;
    }

    return this.functionRepository.save(function_);
  }

  async remove(id: number): Promise<void> {
    const function_ = await this.findOne(id);
    await this.functionRepository.remove(function_);
  }

  async findUpcoming(): Promise<Function[]> {
    const now = new Date();
    return this.functionRepository.find({
      where: {
        startTime: Between(now, new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)), // Próximos 30 días
        status: 'active'
      },
      relations: ['movie', 'cinemaRoom', 'functionSeats', 'functionSeats.seat'],
      order: {
        startTime: 'ASC'
      }
    });
  }

  async findByMovie(movieId: number): Promise<Function[]> {
    const now = new Date();
    return this.functionRepository.find({
      where: {
        movie: { id: movieId },
        startTime: Between(now, new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)), // Próximos 30 días
        status: 'active'
      },
      relations: ['movie', 'cinemaRoom', 'functionSeats', 'functionSeats.seat'],
      order: {
        startTime: 'ASC'
      }
    });
  }
}
