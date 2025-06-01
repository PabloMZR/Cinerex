import { CinemaRoom } from "../../cinema-room/entities/cinema-room.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Movie {
    @ApiProperty({
        description: 'The unique identifier of the movie',
        example: 1
    })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        description: 'The title of the movie',
        example: 'The Matrix'
    })
    @Column('text')
    title: string;

    @ApiProperty({
        description: 'A brief description of the movie',
        example: 'A computer programmer discovers a mysterious world...'
    })
    @Column({
        type: 'text',
        nullable: false
    })
    description: string;

    @ApiProperty({
        description: 'Duration of the movie in minutes',
        example: 136,
        minimum: 1
    })
    @Column({type: 'int', unsigned: true})
    duration: number;

    @ApiProperty({
        description: 'Start time of the movie',
        example: '2024-01-01T20:00:00Z'
    })
    @Column({ type: 'timestamp', nullable: false })
    startTime: Date; 

    @ApiProperty({
        description: 'ID of the cinema room where the movie will be shown',
        example: 1
    })
    @Column()
    cinemaRoomId: number

    @ApiProperty({
        description: 'The cinema room where the movie will be shown',
        type: () => CinemaRoom
    })
    @ManyToOne(() => CinemaRoom, (cinemaRoom) => cinemaRoom.movies, {
        eager: false
        //onDelete: 'CASCADE'
    })
    @JoinColumn({name: 'cinemaRoomId'})
    cinemaRoom: CinemaRoom;

    @ApiProperty({
        description: 'URL of the movie poster image',
        example: '/uploads/movies/poster.jpg',
        required: false
    })
    @Column({ type: 'text', nullable: true }) // URL de la imagen de portada (puede ser null)
    posterUrl?: string;
}
