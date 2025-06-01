import { IsBoolean, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateSeatDto {
    @ApiProperty({
        description: 'The unique code of the seat (e.g., A1, B2)',
        example: 'A1'
    })
    @IsNotEmpty({message: "code can't be empty"})
    @IsString()
    code: string;

    @ApiProperty({
        description: 'Whether the seat is available',
        example: true,
        default: true,
        required: false
    })
    @IsBoolean()
    isAvailable?: boolean;
}
