import { Module } from '@nestjs/common';
import { LocationModule } from './location/location.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesModule } from './movies/movies.module';
import { SeatsModule } from './seats/seats.module';
import { TicketsModule } from './tickets/tickets.module';
import { CinemaRoomModule } from './cinema-room/cinema-room.module';
import { AuthModule } from './auth/auth.module';
import { SeederModule } from './seeder/seeder.module';
import { FunctionModule } from './function/function.module';
import { Movie } from './movies/entities/movie.entity';
import { CinemaRoom } from './cinema-room/entities/cinema-room.entity';
import { Seat } from './seats/entities/seat.entity';
import { Location } from './location/entities/location.entity';
import { Function } from './function/entities/function.entity';
import { Ticket } from './tickets/entities/ticket.entity';
import { FunctionSeat } from './function/entities/function-seat.entity';
import { User } from './auth/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow('DATABASE_HOST'),
        port: configService.getOrThrow('DATABASE_PORT'),
        username: configService.getOrThrow('DATABASE_USER'),
        password: configService.getOrThrow('DATABASE_PASS'),
        database: configService.getOrThrow('DATABASE_NAME'),
        entities: [Movie, CinemaRoom, Seat, Location, Function, Ticket, FunctionSeat, User],
        synchronize: configService.get('NODE_ENV') === 'development',
        logging: configService.get('NODE_ENV') === 'development',
      }),
    }),
    LocationModule,
    MoviesModule,
    SeatsModule,
    TicketsModule,
    CinemaRoomModule,
    AuthModule,
    SeederModule,
    FunctionModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
