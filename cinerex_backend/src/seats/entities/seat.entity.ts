import { CinemaRoom } from "../../cinema-room/entities/cinema-room.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Seat {
    @ApiProperty({
        description: 'The unique identifier of the seat',
        example: 1
    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        description: 'The row identifier of the seat',
        example: 'A1'
    })
    @Column() 
    row: string;

    @ApiProperty({
        description: 'Whether the seat is available',
        example: true,
        default: true
    })
    @Column({default: true})
    status: boolean;

    @ApiProperty({
        description: 'The cinema room this seat belongs to',
        type: () => CinemaRoom
    })
    @ManyToOne(() => CinemaRoom, room => room.seats, { onDelete: 'CASCADE'})
    @JoinColumn({name: 'cinema_room_id'})
    cinemaRoom: CinemaRoom;
}
