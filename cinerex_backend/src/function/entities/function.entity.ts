// comentario
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Movie } from '../../movies/entities/movie.entity';
import { CinemaRoom } from '../../cinema-room/entities/cinema-room.entity';

@Entity()
export class Function {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Movie, { eager: true })
  @JoinColumn({ name: 'movieId' })
  movie: Movie;

  @Column()
  movieId: number;

  @ManyToOne(() => CinemaRoom, { eager: true })
  @JoinColumn({ name: 'cinemaRoomId' })
  cinemaRoom: CinemaRoom;

  @Column()
  cinemaRoomId: number;

  @Column({ type: 'timestamp' })
  startTime: Date;

  @Column({ type: 'timestamp', nullable: true })
  endTime?: Date;

  @Column({ type: 'decimal', precision: 8, scale: 2 })
  price: number;

  @Column({ default: 'active' })
  status: string;
}
