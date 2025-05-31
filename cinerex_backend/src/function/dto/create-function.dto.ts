import { IsInt, IsNotEmpty, IsNumber, IsString, IsDateString } from 'class-validator';

export class CreateFunctionDto {
  @IsInt()
  movieId: number;

  @IsInt()
  cinemaRoomId: number;

  @IsDateString()
  startTime: string;

  @IsDateString()
  endTime?: string;

  @IsNumber()
  price: number;

  @IsString()
  status?: string;
}
