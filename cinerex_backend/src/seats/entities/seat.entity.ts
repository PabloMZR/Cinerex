import { CinemaRoom } from "../../cinema-room/entities/cinema-room.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { FunctionSeat } from "../../function/entities/function-seat.entity";

@Entity()
export class Seat {
    @ApiProperty({
        description: 'The unique identifier of the seat',
        example: 1
    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        description: 'The row number of the seat',
        example: 1
    })
    @Column({type: 'int'}) 
    row: number;

    @ApiProperty({
        description: 'The column number of the seat',
        example: 1
    })
    @Column({type: 'int'})
    column: number;

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

    @ApiProperty({
        description: 'Function seats associated with this seat',
        type: () => [FunctionSeat]
    })
    @OneToMany(() => FunctionSeat, functionSeat => functionSeat.seat)
    functionSeats: FunctionSeat[];
}
