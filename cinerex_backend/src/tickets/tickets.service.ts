import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './entities/ticket.entity';
import { Function } from '../function/entities/function.entity';
import { FunctionSeat } from '../function/entities/function-seat.entity';
import { SeatStatus } from '../function/entities/function-seat.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    @InjectRepository(Function)
    private readonly functionRepository: Repository<Function>,
    @InjectRepository(FunctionSeat)
    private readonly functionSeatRepository: Repository<FunctionSeat>,
  ) {}

  async create(createTicketDto: CreateTicketDto) {
    const function_ = await this.functionRepository.findOne({
      where: { id: createTicketDto.functionId },
      relations: ['functionSeats', 'functionSeats.seat'],
    });

    if (!function_) {
      throw new NotFoundException('Function not found');
    }

    // Verify all seats exist and are available
    const functionSeats = await Promise.all(
      createTicketDto.functionSeatIds.map(async (seatId) => {
        const functionSeat = await this.functionSeatRepository.findOne({
          where: { id: seatId, function: { id: function_.id } },
          relations: ['seat'],
        });

        if (!functionSeat) {
          throw new NotFoundException(`Function seat ${seatId} not found`);
        }

        if (functionSeat.status !== SeatStatus.AVAILABLE) {
          throw new BadRequestException(`Seat ${functionSeat.seat.row}-${functionSeat.seat.column} is not available`);
        }

        return functionSeat;
      })
    );

    // Calculate total price
    const total = function_.price * functionSeats.length;

    // Create ticket
    const ticket = this.ticketRepository.create({
      function: function_,
      functionSeats,
      total,
    });

    // Update seat status to occupied
    await Promise.all(
      functionSeats.map(async (functionSeat) => {
        functionSeat.status = SeatStatus.OCCUPIED;
        await this.functionSeatRepository.save(functionSeat);
      })
    );

    return this.ticketRepository.save(ticket);
  }

  async findAll() {
    return this.ticketRepository.find({
      relations: [
        'function',
        'function.movie',
        'function.cinemaRoom',
        'functionSeats',
        'functionSeats.seat'
      ],
    });
  }

  async findOne(id: number) {
    const ticket = await this.ticketRepository.findOne({
      where: { id },
      relations: [
        'function',
        'function.movie',
        'function.cinemaRoom',
        'functionSeats',
        'functionSeats.seat'
      ],
    });

    if (!ticket) {
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }

    return ticket;
  }

  async update(id: number, updateTicketDto: UpdateTicketDto) {
    const ticket = await this.findOne(id);
    Object.assign(ticket, updateTicketDto);
    return this.ticketRepository.save(ticket);
  }

  async remove(id: number) {
    const ticket = await this.findOne(id);
    
    // Release seats
    await Promise.all(
      ticket.functionSeats.map(async (functionSeat) => {
        functionSeat.status = SeatStatus.AVAILABLE;
        await this.functionSeatRepository.save(functionSeat);
      })
    );

    await this.ticketRepository.remove(ticket);
  }
}
