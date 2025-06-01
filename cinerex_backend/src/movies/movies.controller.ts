import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ValidationPipe } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { IdValidationPipe } from 'src/common/pipes/id-validation/id-validation.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBody } from '@nestjs/swagger';

@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new movie' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', example: 'The Matrix' },
        description: { type: 'string', example: 'A computer programmer discovers a mysterious world...' },
        duration: { type: 'number', example: 136 },
        releaseDate: { type: 'string', format: 'date', example: '2024-01-01' },
        image: {
          type: 'string',
          format: 'binary',
          description: 'Movie poster image'
        }
      }
    }
  })
  @ApiResponse({ status: 201, description: 'The movie has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads/movies',
      filename: (req, file, cb) => {
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
  @ApiOperation({ summary: 'Get all movies' })
  @ApiResponse({ status: 200, description: 'Return all movies.' })
  findAll() {
    return this.moviesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a movie by id' })
  @ApiResponse({ status: 200, description: 'Return the movie.' })
  @ApiResponse({ status: 404, description: 'Movie not found.' })
  findOne(@Param('id', IdValidationPipe) id: string) {
    return this.moviesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a movie' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', example: 'Updated Title' },
        description: { type: 'string' },
        duration: { type: 'number' },
        releaseDate: { type: 'string', format: 'date' },
        image: {
          type: 'string',
          format: 'binary',
          description: 'Movie poster image'
        }
      }
    }
  })
  @ApiResponse({ status: 200, description: 'The movie has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Movie not found.' })
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
  @ApiOperation({ summary: 'Delete a movie' })
  @ApiResponse({ status: 200, description: 'The movie has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Movie not found.' })
  remove(@Param('id', IdValidationPipe) id: string) {
    return this.moviesService.remove(+id);
  }

  @Get('upcoming')
  @ApiOperation({ summary: 'Get upcoming movies' })
  @ApiResponse({ status: 200, description: 'Return upcoming movies.' })
  findUpcoming() {
    return this.moviesService.findUpcoming();
  }

  @Get('by-cinema-room/:cinemaRoomId')
  @ApiOperation({ summary: 'Get movies by cinema room' })
  @ApiResponse({ status: 200, description: 'Return movies for the specified cinema room.' })
  @ApiResponse({ status: 404, description: 'Cinema room not found.' })
  async findByCinemaRoom(@Param('cinemaRoomId') cinemaRoomId: number) {
    return this.moviesService.findByCinemaRoom(cinemaRoomId);
  }
}
