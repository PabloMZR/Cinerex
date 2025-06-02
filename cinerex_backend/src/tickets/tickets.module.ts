import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { Ticket } from './entities/ticket.entity';
import { Function } from '../function/entities/function.entity';
import { FunctionSeat } from '../function/entities/function-seat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket, Function, FunctionSeat])],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class TicketsModule {}
