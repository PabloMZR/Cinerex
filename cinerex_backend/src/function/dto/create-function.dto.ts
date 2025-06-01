import { IsInt, IsNotEmpty, IsNumber, IsString, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFunctionDto {
  @ApiProperty({
    description: 'ID of the movie for this function',
    example: 1
  })
  @IsInt()
  movieId: number;

  @ApiProperty({
    description: 'ID of the cinema room where the function will be shown',
    example: 1
  })
  @IsInt()
  cinemaRoomId: number;

  @ApiProperty({
    description: 'Start time of the function in ISO8601 format',
    example: '2024-01-01T20:00:00Z'
  })
  @IsDateString()
  startTime: string;

  @ApiProperty({
    description: 'End time of the function in ISO8601 format',
    example: '2024-01-01T22:00:00Z',
    required: false
  })
  @IsDateString()
  endTime?: string;

  @ApiProperty({
    description: 'Price of the function ticket',
    example: 10.50
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'Status of the function',
    example: 'ACTIVE',
    required: false,
    default: 'ACTIVE'
  })
  @IsString()
  status?: string;
}
