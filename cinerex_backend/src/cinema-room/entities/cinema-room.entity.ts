import { Seat } from "../../seats/entities/seat.entity";
import { Movie } from "../../movies/entities/movie.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Location } from "../../location/entities/location.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class CinemaRoom {
    @ApiProperty({
        description: 'The unique identifier of the cinema room',
        example: 1
    })
    @PrimaryGeneratedColumn()
    id: number;
    
    @ApiProperty({
        description: 'The name of the cinema room',
        example: 'Sala 1',
        maxLength: 60
    })
    @Column({
        type: 'varchar',
        length: 60
    })
    name: string;

    @ApiProperty({
        description: 'ID of the location where the cinema room is located',
        example: 1,
        nullable: true
    })
    @Column({nullable: true})
    locationId: number | null;

    @ApiProperty({
        description: 'The location object where the cinema room is located',
        type: () => Location
    })
    @ManyToOne(() => Location, location => location.rooms, { 
        nullable: true,
        onDelete: 'SET NULL' 
    })
    @JoinColumn({ name: 'locationId' })
    location: Location;

    @ApiProperty({
        description: 'List of movies shown in this cinema room',
        type: () => [Movie]
    })
    @OneToMany(() => Movie, (movie) => movie.cinemaRoom)
    movies: Movie[];

    @ApiProperty({
        description: 'List of seats in this cinema room',
        type: () => [Seat]
    })
    @OneToMany(() => Seat, seat => seat.cinemaRoom, {
        cascade: true, 
        eager:true
    })
    seats: Seat[];
}
