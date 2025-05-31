import { ArrayMinSize, IsArray, IsInt, IsNotEmpty, IsNumber } from "class-validator";

export class CreateTicketDto {
    @IsInt()
    @IsNotEmpty({message: "functionId can't be empty"})
    functionId: number;
    @IsArray()
    @ArrayMinSize(1)
    @IsInt({ each: true })
    @IsNotEmpty({message: "seatIds can't be empty"})
    seatIds: number[];
    @IsNumber()
    @IsNotEmpty({message: "total can't be empty"})
    total: number;
}
