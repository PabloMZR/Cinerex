import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';  
import { ApiProperty } from '@nestjs/swagger';

export class CreateLocationDto {
    @ApiProperty({
        description: 'The name of the location',
        example: 'Cinerex Centro',
        maxLength: 38
    })
    @IsNotEmpty({message: "Location name can't be empty"})
    @IsString()
    @MaxLength(38)
    name: string;

    @ApiProperty({
        description: 'The address of the location',
        example: 'Av. Principal 123',
        required: false
    })
    @IsString()
    @IsOptional()
    address: string;
}
