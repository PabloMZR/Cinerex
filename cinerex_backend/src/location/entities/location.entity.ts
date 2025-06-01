import { CinemaRoom } from "../../cinema-room/entities/cinema-room.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Location {
    @ApiProperty({
        description: 'The unique identifier of the location',
        example: 1
    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        description: 'The name of the location',
        example: 'Cinerex Centro',
        maxLength: 38
    })
    @Column({
        type: 'varchar',
        length: 38
    })
    name: string;

    @ApiProperty({
        description: 'The address of the location',
        example: 'Av. Principal 123',
        nullable: true
    })
    @Column({
        type: 'text',
        nullable: true
    })
    address: string;

    @ApiProperty({
        description: 'List of cinema rooms in this location',
        type: () => [CinemaRoom]
    })
    @OneToMany(() => CinemaRoom, room => room.location)
    rooms: CinemaRoom[];
}
