import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { FunctionService } from './function.service';
import { CreateFunctionDto } from './dto/create-function.dto';
import { UpdateFunctionDto } from './dto/update-function.dto';
import { Function } from './entities/function.entity';
import { IdValidationPipe } from '../common/pipes/id-validation/id-validation.pipe';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Functions')
@Controller('function')
export class FunctionController {
  constructor(private readonly functionService: FunctionService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new function' })
  @ApiResponse({ status: 201, description: 'The function has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body(new ValidationPipe({ transform: true })) createFunctionDto: CreateFunctionDto): Promise<Function> {
    return this.functionService.create(createFunctionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all functions' })
  @ApiResponse({ status: 200, description: 'Return all functions.' })
  findAll(): Promise<Function[]> {
    return this.functionService.findAll();
  }

  @Get('upcoming')
  @ApiOperation({ summary: 'Get upcoming functions' })
  @ApiResponse({ status: 200, description: 'Return upcoming functions.' })
  findUpcoming(): Promise<Function[]> {
    return this.functionService.findUpcoming();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a function by id' })
  @ApiResponse({ status: 200, description: 'Return the function.' })
  @ApiResponse({ status: 404, description: 'Function not found.' })
  findOne(@Param('id', IdValidationPipe) id: string): Promise<Function> {
    return this.functionService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a function' })
  @ApiResponse({ status: 200, description: 'The function has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Function not found.' })
  update(
    @Param('id', IdValidationPipe) id: string,
    @Body(new ValidationPipe({ transform: true })) updateFunctionDto: UpdateFunctionDto
  ): Promise<Function> {
    return this.functionService.update(+id, updateFunctionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a function' })
  @ApiResponse({ status: 200, description: 'The function has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Function not found.' })
  remove(@Param('id', IdValidationPipe) id: string): Promise<void> {
    return this.functionService.remove(+id);
  }
}
