import { Function } from "src/function/entities/function.entity";
import { Seat } from "src/seats/entities/seat.entity";
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
        description: 'The seats associated with this ticket',
        type: () => [Seat]
    })
    @ManyToMany(() => Seat, {eager: true})
    @JoinTable({
        name: 'ticket_seats',
        joinColumn: { name: 'ticket_id', referencedColumnName: 'id'},
        inverseJoinColumn: { name: 'seat_id', referencedColumnName: 'id'}
    })
    seats : Seat[];

    @ApiProperty({
        description: 'Total price of the ticket',
        example: 25.50
    })
    @Column({ type: 'decimal', precision: 6, scale: 2})
    total : number;
}
