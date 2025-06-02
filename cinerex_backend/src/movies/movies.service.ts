import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie) private readonly movieRepository: Repository<Movie>
  ) {}

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const movie = this.movieRepository.create({
      title: createMovieDto.title,
      description: createMovieDto.description,
      duration: createMovieDto.duration,
      posterUrl: createMovieDto.posterUrl
    });

    return await this.movieRepository.save(movie);
  }

  async findAll(): Promise<Movie[]> {
    return this.movieRepository.find({
      relations: ['functions', 'functions.cinemaRoom']
    });
  }

  async findOne(id: number): Promise<Movie> {
    const movie = await this.movieRepository.findOne({
      where: { id },
      relations: ['functions', 'functions.cinemaRoom']
    });

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    return movie;
  }

  async update(id: number, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    const movie = await this.findOne(id);

    if (updateMovieDto.title) movie.title = updateMovieDto.title;
    if (updateMovieDto.description) movie.description = updateMovieDto.description;
    if (updateMovieDto.duration) movie.duration = updateMovieDto.duration;
    if (updateMovieDto.posterUrl) movie.posterUrl = updateMovieDto.posterUrl;

    return await this.movieRepository.save(movie);
  }

  async remove(id: number): Promise<void> {
    const movie = await this.findOne(id);
    await this.movieRepository.remove(movie);
  }

  async findUpcoming(): Promise<Movie[]> {
    return this.movieRepository.find({
      relations: ['functions', 'functions.cinemaRoom'],
      where: {
        functions: {
          startTime: new Date()
        }
      }
    });
  }

  async findByCinemaRoom(cinemaRoomId: number): Promise<Movie[]> {
    return this.movieRepository.find({
      relations: ['functions', 'functions.cinemaRoom'],
      where: {
        functions: {
          cinemaRoom: { id: cinemaRoomId }
        }
      }
    });
  }
}
