import { Function } from "src/function/entities/function.entity";
import { Seat } from "src/seats/entities/seat.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Ticket {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Function, func => func.id, { eager: true })
    @JoinColumn({ name: 'function_id' })
    function: Function;
    
    @ManyToMany(() => Seat, {eager: true})
    @JoinTable({
        name: 'ticket_seats',
        joinColumn: { name: 'ticket_id', referencedColumnName: 'id'},
        inverseJoinColumn: { name: 'seat_id', referencedColumnName: 'id'}
    })
    seats : Seat[];

    @Column({ type: 'decimal', precision: 6, scale: 2})
    total : number;
}
