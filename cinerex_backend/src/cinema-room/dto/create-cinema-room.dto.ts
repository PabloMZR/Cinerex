import { Type } from "class-transformer";
import { IsArray, IsInt, IsNotEmpty, IsString, Min, ValidateNested } from "class-validator";
import { CreateSeatDto } from "src/seats/dto/create-seat.dto";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCinemaRoomDto {
    @ApiProperty({
        description: 'The name of the cinema room',
        example: 'Sala 1'
    })
    @IsNotEmpty({message: "name can't be empty"})
    @IsString()
    name: string;

    @ApiProperty({
        description: 'ID of the location where the cinema room is located',
        example: 1,
        minimum: 1
    })
    @IsNotEmpty({message: "locationId can't be empty"})
    @IsInt()
    @Min(1, { message: "locationId must be greater than 0" })
    locationId: number;

    @ApiProperty({
        description: 'Array of seats in the cinema room',
        type: [CreateSeatDto]
    })
    @IsNotEmpty({ message: "seats can't be empty" })
    @IsArray({ message: "seats must be an array" })
    @ValidateNested({ each: true })
    @Type(() => CreateSeatDto)
    seats: CreateSeatDto[];
}
