import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeatsService } from './seats.service';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Seats')
@Controller('seats')
export class SeatsController {
  constructor(private readonly seatsService: SeatsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new seat' })
  @ApiResponse({ status: 201, description: 'The seat has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body() createSeatDto: CreateSeatDto) {
    return this.seatsService.create(createSeatDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all seats' })
  @ApiResponse({ status: 200, description: 'Return all seats.' })
  findAll() {
    return this.seatsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a seat by id' })
  @ApiResponse({ status: 200, description: 'Return the seat.' })
  @ApiResponse({ status: 404, description: 'Seat not found.' })
  findOne(@Param('id') id: string) {
    return this.seatsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a seat' })
  @ApiResponse({ status: 200, description: 'The seat has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Seat not found.' })
  update(@Param('id') id: string, @Body() updateSeatDto: UpdateSeatDto) {
    return this.seatsService.update(+id, updateSeatDto);
  }
}
