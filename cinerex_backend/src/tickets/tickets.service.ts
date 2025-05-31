import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { Repository, In } from 'typeorm';
import { Seat } from '../seats/entities/seat.entity';
import { Function } from '../function/entities/function.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket) 
    private readonly ticketRepository: Repository<Ticket>,
    @InjectRepository(Seat) 
    private readonly seatRepository: Repository<Seat>,
    @InjectRepository(Function)
    private readonly functionRepository: Repository<Function>
  ) {}

  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const func = await this.functionRepository.findOneBy({ id: createTicketDto.functionId });
    if (!func) throw new NotFoundException('Function not found');
    
    const seats = await this.seatRepository.findBy({ id: In(createTicketDto.seatIds) });
    if (seats.length !== createTicketDto.seatIds.length) {
      throw new BadRequestException('Some seat IDs are invalid');
    }

    // Verificar que los asientos pertenezcan a la sala de la función
    const invalidSeats = seats.filter(seat => seat.cinemaRoom.id !== func.cinemaRoom.id);
    if (invalidSeats.length > 0) {
      throw new BadRequestException('Some seats do not belong to the function\'s cinema room');
    }

    const ticket = this.ticketRepository.create({
      function: func,
      seats,
      total: createTicketDto.total
    });

    return this.ticketRepository.save(ticket);
  }

  findAll(): Promise<Ticket[]> {
    return this.ticketRepository.find({
      relations: ['function', 'function.movie', 'function.cinemaRoom', 'seats']
    });
  }

  findOne(id: number) {
    return this.ticketRepository.findOne({
      where: { id },
      relations: ['function', 'function.movie', 'function.cinemaRoom', 'seats']
    });
  }

  async remove(id: number) {
    await this.ticketRepository.delete(id);
    return "Ticket eliminated";
  }
}
