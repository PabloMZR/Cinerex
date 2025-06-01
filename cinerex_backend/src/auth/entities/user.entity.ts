import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
    @ApiProperty({
        description: 'The unique identifier of the user',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @PrimaryGeneratedColumn('uuid')
    userId: string;
    @ApiProperty({
        description: 'The email address of the user',
        example: 'user@example.com'
    })
    @Column('text', {
        unique: true,
    })
    email: string;
    @ApiProperty({
        description: 'The hashed password of the user',
        example: 'hashedPassword123'
    })
    @Column('text')
    password: string;
    @ApiProperty({
        description: 'The roles assigned to the user',
        example: ['User', 'Admin'],
        default: ['User']
    })
    @Column("simple-array", { default: "User"})
    role: string[];
}
