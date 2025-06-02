import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Function } from "../../function/entities/function.entity";

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
        description: 'URL of the movie poster image',
        example: '/uploads/movies/poster.jpg',
        required: false
    })
    @Column({ type: 'text', nullable: true })
    posterUrl?: string;

    @ApiProperty({
        description: 'Functions where this movie is shown',
        type: () => [Function]
    })
    @OneToMany(() => Function, (func) => func.movie)
    functions: Function[];
}
