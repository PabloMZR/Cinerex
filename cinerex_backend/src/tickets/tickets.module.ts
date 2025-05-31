import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { Seat } from '../seats/entities/seat.entity';
import { Function } from '../function/entities/function.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket, Seat, Function])],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class TicketsModule {}
