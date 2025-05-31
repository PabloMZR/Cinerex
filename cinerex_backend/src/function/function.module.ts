import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FunctionService } from './function.service';
import { FunctionController } from './function.controller';
import { Function } from './entities/function.entity';
import { Movie } from '../movies/entities/movie.entity';
import { CinemaRoom } from '../cinema-room/entities/cinema-room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Function, Movie, CinemaRoom])],
  controllers: [FunctionController],
  providers: [FunctionService],
})
export class FunctionModule {}
