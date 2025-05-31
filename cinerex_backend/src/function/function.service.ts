import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, Not } from 'typeorm';
import { CreateFunctionDto } from './dto/create-function.dto';
import { UpdateFunctionDto } from './dto/update-function.dto';
import { Function } from './entities/function.entity';
import { Movie } from '../movies/entities/movie.entity';
import { CinemaRoom } from '../cinema-room/entities/cinema-room.entity';

@Injectable()
export class FunctionService {
  constructor(
    @InjectRepository(Function)
    private readonly functionRepository: Repository<Function>,
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @InjectRepository(CinemaRoom)
    private readonly cinemaRoomRepository: Repository<CinemaRoom>,
  ) {}

  async create(createFunctionDto: CreateFunctionDto): Promise<Function> {
    const { movieId, cinemaRoomId, startTime, endTime, price } = createFunctionDto;

    // Verificar que la película existe
    const movie = await this.movieRepository.findOneBy({ id: movieId });
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    // Verificar que la sala existe
    const cinemaRoom = await this.cinemaRoomRepository.findOneBy({ id: cinemaRoomId });
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

    const func = this.functionRepository.create({
      movie,
      cinemaRoom,
      startTime: startDate,
      endTime: endDate,
      price,
      status: 'active'
    });

    return this.functionRepository.save(func);
  }

  async findAll(): Promise<Function[]> {
    return this.functionRepository.find({
      relations: ['movie', 'cinemaRoom'],
      order: {
        startTime: 'ASC'
      }
    });
  }

  async findOne(id: number): Promise<Function> {
    const func = await this.functionRepository.findOne({
      where: { id },
      relations: ['movie', 'cinemaRoom']
    });

    if (!func) {
      throw new NotFoundException('Function not found');
  }

    return func;
  }

  async update(id: number, updateFunctionDto: UpdateFunctionDto): Promise<Function> {
    const func = await this.findOne(id);
    
    // Si se actualiza el horario, verificar que no haya solapamiento
    if (updateFunctionDto.startTime || updateFunctionDto.endTime) {
      const startDate = updateFunctionDto.startTime ? new Date(updateFunctionDto.startTime) : func.startTime;
      const endDate = updateFunctionDto.endTime ? new Date(updateFunctionDto.endTime) : func.endTime;

      if (!startDate || !endDate) {
        throw new BadRequestException('startTime y endTime son requeridos para verificar solapamiento');
  }

      const overlappingFunction = await this.functionRepository.findOne({
        where: {
          cinemaRoom: { id: func.cinemaRoom.id },
          startTime: Between(startDate, endDate),
          status: 'active',
          id: Not(id) // Excluir la función actual
        }
      });

      if (overlappingFunction) {
        throw new BadRequestException('There is already a function scheduled at this time in this cinema room');
      }
    }

    Object.assign(func, updateFunctionDto);
    return this.functionRepository.save(func);
  }

  async remove(id: number): Promise<void> {
    const func = await this.findOne(id);
    func.status = 'cancelled';
    await this.functionRepository.save(func);
  }

  async findUpcoming(): Promise<Function[]> {
    const now = new Date();
    return this.functionRepository.find({
      where: {
        startTime: Between(now, new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)), // Próximos 30 días
        status: 'active'
      },
      relations: ['movie', 'cinemaRoom'],
      order: {
        startTime: 'ASC'
      }
    });
  }
}
