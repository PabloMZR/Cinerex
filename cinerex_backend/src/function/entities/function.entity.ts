// comentario
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Movie } from '../../movies/entities/movie.entity';
import { CinemaRoom } from '../../cinema-room/entities/cinema-room.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Function {
  @ApiProperty({
    description: 'The unique identifier of the function',
    example: 1
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'The movie object associated with this function',
    type: () => Movie
  })
  @ManyToOne(() => Movie, { eager: true })
  @JoinColumn({ name: 'movieId' })
  movie: Movie;

  @ApiProperty({
    description: 'ID of the movie for this function',
    example: 1
  })
  @Column()
  movieId: number;

  @ApiProperty({
    description: 'The cinema room object where the function takes place',
    type: () => CinemaRoom
  })
  @ManyToOne(() => CinemaRoom, { eager: true })
  @JoinColumn({ name: 'cinemaRoomId' })
  cinemaRoom: CinemaRoom;

  @ApiProperty({
    description: 'ID of the cinema room where the function takes place',
    example: 1
  })
  @Column()
  cinemaRoomId: number;

  @ApiProperty({
    description: 'Start time of the function',
    example: '2024-01-01T20:00:00Z'
  })
  @Column({ type: 'timestamp' })
  startTime: Date;

  @ApiProperty({
    description: 'End time of the function',
    example: '2024-01-01T22:00:00Z',
    required: false
  })
  @Column({ type: 'timestamp', nullable: true })
  endTime?: Date;

  @ApiProperty({
    description: 'Price of the function ticket',
    example: 10.50
  })
  @Column({ type: 'decimal', precision: 8, scale: 2 })
  price: number;

  @ApiProperty({
    description: 'Status of the function',
    example: 'active',
    default: 'active'
  })
  @Column({ default: 'active' })
  status: string;
}
