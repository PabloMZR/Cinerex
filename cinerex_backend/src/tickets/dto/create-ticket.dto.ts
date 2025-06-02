import { IsArray, IsNumber, IsPositive } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTicketDto {
    @ApiProperty({
        description: 'ID of the function for this ticket',
        example: 1
    })
    @IsNumber()
    @IsPositive()
    functionId: number;

    @ApiProperty({
        description: 'IDs of the function seats for this ticket',
        example: [1, 2],
        type: [Number]
    })
    @IsArray()
    @IsNumber({}, { each: true })
    functionSeatIds: number[];
}
