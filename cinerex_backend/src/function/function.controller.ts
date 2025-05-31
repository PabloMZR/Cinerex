import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { FunctionService } from './function.service';
import { CreateFunctionDto } from './dto/create-function.dto';
import { UpdateFunctionDto } from './dto/update-function.dto';
import { Function } from './entities/function.entity';
import { IdValidationPipe } from '../common/pipes/id-validation/id-validation.pipe';

@Controller('function')
export class FunctionController {
  constructor(private readonly functionService: FunctionService) {}

  @Post()
  create(@Body(new ValidationPipe({ transform: true })) createFunctionDto: CreateFunctionDto): Promise<Function> {
    return this.functionService.create(createFunctionDto);
  }

  @Get()
  findAll(): Promise<Function[]> {
    return this.functionService.findAll();
  }

  @Get('upcoming')
  findUpcoming(): Promise<Function[]> {
    return this.functionService.findUpcoming();
  }

  @Get(':id')
  findOne(@Param('id', IdValidationPipe) id: string): Promise<Function> {
    return this.functionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id', IdValidationPipe) id: string,
    @Body(new ValidationPipe({ transform: true })) updateFunctionDto: UpdateFunctionDto
  ): Promise<Function> {
    return this.functionService.update(+id, updateFunctionDto);
  }

  @Delete(':id')
  remove(@Param('id', IdValidationPipe) id: string): Promise<void> {
    return this.functionService.remove(+id);
  }
}
