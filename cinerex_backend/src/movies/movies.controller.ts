import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ValidationPipe } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { IdValidationPipe } from 'src/common/pipes/id-validation/id-validation.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads/movies', // Carpeta donde se guardan las imágenes
      filename: (req, file, cb) => {
        // Generar un nombre único para la imagen
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + extname(file.originalname));
      }
    })
  }))
  create(
    @Body(new ValidationPipe({ transform: true })) createMovieDto: CreateMovieDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    console.log('Archivo recibido:', file);
    // Si se subió una imagen, agregar la URL al DTO
    if (file) {
      createMovieDto.posterUrl = `/uploads/movies/${file.filename}`;
      console.log('Asignando posterUrl:', createMovieDto.posterUrl);
    } else {
      console.log('No se recibió archivo de imagen');
    }
    return this.moviesService.create(createMovieDto);
  }
  
  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', IdValidationPipe) id: string) {
    return this.moviesService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads/movies',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + extname(file.originalname));
      }
    })
  }))
  update(
    @Param('id', IdValidationPipe) id: string,
    @Body() updateMovieDto: UpdateMovieDto,
    @UploadedFile() file?: Express.Multer.File
  ) {
    if (file) {
      updateMovieDto.posterUrl = `/uploads/movies/${file.filename}`;
    }
    return this.moviesService.update(+id, updateMovieDto);
  }

  @Delete(':id')
  remove(@Param('id', IdValidationPipe) id: string) {
    return this.moviesService.remove(+id);
  }

  @Get('upcoming')
  findUpcoming() {
    return this.moviesService.findUpcoming();
  }

  @Get('by-cinema-room/:cinemaRoomId')
  async findByCinemaRoom(@Param('cinemaRoomId') cinemaRoomId: number) {
    return this.moviesService.findByCinemaRoom(cinemaRoomId);
  }
}
