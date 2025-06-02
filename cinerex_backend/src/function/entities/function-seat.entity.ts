import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Function } from './function.entity';
import { Seat } from '../../seats/entities/seat.entity';
import { ApiProperty } from '@nestjs/swagger';

export enum SeatStatus {
    AVAILABLE = 'available',
    RESERVED = 'reserved',
    OCCUPIED = 'occupied'
}

@Entity()
export class FunctionSeat {
    @ApiProperty({
        description: 'The unique identifier of the function seat',
        example: 1
    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        description: 'The function this seat belongs to',
        type: () => Function
    })
    @ManyToOne(() => Function, (func) => func.functionSeats, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'function_id' })
    function: Function;

    @Column({ name: 'function_id' })
    functionId: number;

    @ApiProperty({
        description: 'The seat associated with this function',
        type: () => Seat
    })
    @ManyToOne(() => Seat, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'seat_id' })
    seat: Seat;

    @Column({ name: 'seat_id' })
    seatId: number;

    @ApiProperty({
        description: 'The status of the seat for this function',
        enum: SeatStatus,
        example: SeatStatus.AVAILABLE
    })
    @Column({
        type: 'enum',
        enum: SeatStatus,
        default: SeatStatus.AVAILABLE
    })
    status: SeatStatus;
} 