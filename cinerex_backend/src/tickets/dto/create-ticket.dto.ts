import { ArrayMinSize, IsArray, IsInt, IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTicketDto {
    @ApiProperty({
        description: 'ID of the function for this ticket',
        example: 1
    })
    @IsInt()
    @IsNotEmpty({message: "functionId can't be empty"})
    functionId: number;

    @ApiProperty({
        description: 'Array of seat IDs for this ticket',
        example: [1, 2],
        type: [Number],
        minItems: 1
    })
    @IsArray()
    @ArrayMinSize(1)
    @IsInt({ each: true })
    @IsNotEmpty({message: "seatIds can't be empty"})
    seatIds: number[];

    @ApiProperty({
        description: 'Total price of the ticket',
        example: 25.50
    })
    @IsNumber()
    @IsNotEmpty({message: "total can't be empty"})
    total: number;
}
