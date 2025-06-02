import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FunctionService } from './function.service';
import { FunctionController } from './function.controller';
import { Function } from './entities/function.entity';
import { Movie } from '../movies/entities/movie.entity';
import { CinemaRoom } from '../cinema-room/entities/cinema-room.entity';
import { FunctionSeat } from './entities/function-seat.entity';
import { Seat } from '../seats/entities/seat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Function, Movie, CinemaRoom, FunctionSeat, Seat])],
  controllers: [FunctionController],
  providers: [FunctionService],
  exports: [FunctionService]
})
export class FunctionModule {}
