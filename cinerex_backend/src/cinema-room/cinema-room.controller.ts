import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CinemaRoomService } from './cinema-room.service';
import { CreateCinemaRoomDto } from './dto/create-cinema-room.dto';
import { UpdateCinemaRoomDto } from './dto/update-cinema-room.dto';
import { IdValidationPipe } from 'src/common/pipes/id-validation/id-validation.pipe';
import { Auth } from '../auth/decorators/auth.decorator';
import { ROLES } from 'src/auth/constants/roles.constants';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

//@Auth()
@ApiTags('Cinema Rooms')
@Controller('cinema-room')
export class CinemaRoomController {
  constructor(
    private readonly cinemaRoomService: CinemaRoomService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new cinema room' })
  @ApiResponse({ status: 201, description: 'The cinema room has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body() createCinemaRoomDto: CreateCinemaRoomDto) {
    return this.cinemaRoomService.create(createCinemaRoomDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all cinema rooms' })
  @ApiResponse({ status: 200, description: 'Return all cinema rooms.' })
  findAll() {
    return this.cinemaRoomService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a cinema room by id' })
  @ApiResponse({ status: 200, description: 'Return the cinema room.' })
  @ApiResponse({ status: 404, description: 'Cinema room not found.' })
  findOne(@Param('id', IdValidationPipe) id: string) {
    return this.cinemaRoomService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a cinema room' })
  @ApiResponse({ status: 200, description: 'The cinema room has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Cinema room not found.' })
  update(@Param('id', IdValidationPipe) id: string, @Body() updateCinemaRoomDto: UpdateCinemaRoomDto) {
    return this.cinemaRoomService.update(+id, updateCinemaRoomDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a cinema room' })
  @ApiResponse({ status: 200, description: 'The cinema room has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Cinema room not found.' })
  remove(@Param('id', IdValidationPipe) id: string) {
    return this.cinemaRoomService.remove(+id);
  }
}
