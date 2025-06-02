import { IsDateString, IsInt, IsISO8601, IsNotEmpty, IsString, Matches, Min, IsNumber, IsOptional } from "class-validator";
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
    @ApiProperty({
        description: 'The title of the movie',
        example: 'The Matrix'
    })
    @IsNotEmpty({message: "title can't be empty"})
    @IsString()
    title: string;

    @ApiProperty({
        description: 'A brief description of the movie',
        example: 'A computer programmer discovers a mysterious world...'
    })
    @IsNotEmpty({message: "description can't be empty"})
    @IsString()
    description: string;

    @ApiProperty({
        description: 'Duration of the movie in minutes',
        example: 136,
        minimum: 1
    })
    @IsNotEmpty({message: "duration can't be empty"})
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    duration: number;

    @ApiProperty({
        description: 'URL of the movie poster image',
        example: '/uploads/movies/poster.jpg',
        required: false
    })
    @IsString()
    @IsOptional()
    posterUrl?: string;
}
