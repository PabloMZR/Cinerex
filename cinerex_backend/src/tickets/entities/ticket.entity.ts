import { Function } from "src/function/entities/function.entity";
import { FunctionSeat } from "src/function/entities/function-seat.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Ticket {
    @ApiProperty({
        description: 'The unique identifier of the ticket',
        example: 1
    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        description: 'The function associated with this ticket',
        type: () => Function
    })
    @ManyToOne(() => Function, func => func.id, { eager: true })
    @JoinColumn({ name: 'function_id' })
    function: Function;
    
    @ApiProperty({
        description: 'The function seats associated with this ticket',
        type: () => [FunctionSeat]
    })
    @ManyToMany(() => FunctionSeat, {eager: true})
    @JoinTable({
        name: 'ticket_function_seats',
        joinColumn: { name: 'ticket_id', referencedColumnName: 'id'},
        inverseJoinColumn: { name: 'function_seat_id', referencedColumnName: 'id'}
    })
    functionSeats: FunctionSeat[];

    @ApiProperty({
        description: 'Total price of the ticket',
        example: 25.50
    })
    @Column({ type: 'decimal', precision: 8, scale: 2})
    total: number;

    @ApiProperty({
        description: 'Creation date of the ticket',
        example: '2024-01-01T20:00:00Z'
    })
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}
