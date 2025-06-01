import { IsDateString, IsInt, IsISO8601, IsNotEmpty, IsString, Matches, Min } from "class-validator";
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
    @IsInt({message: "duration must be a valid number of minutes"})
    @Min(1,{message: "duration must be greater than zero"})
    @Type(() => Number)
    duration: number;

    @ApiProperty({
        description: 'Start time of the movie in ISO8601 format',
        example: '2024-01-01T20:00:00Z'
    })
    @IsNotEmpty({message: "startTime can't be empty"})
    @IsISO8601()
    startTime: string;

    @ApiProperty({
        description: 'ID of the cinema room where the movie will be shown',
        example: 1
    })
    @IsNotEmpty({message: "cinemaRoomId can't be empty"})
    @IsInt()
    @Type(() => Number)
    cinemaRoomId: number;

    @ApiProperty({
        description: 'URL of the movie poster image',
        example: '/uploads/movies/poster.jpg',
        required: false
    })
    posterUrl?: string;
}
