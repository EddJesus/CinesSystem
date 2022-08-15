import { Entity } from "./Entity";

type MovieProps = {
    name: string
    gender: string
    durationInMinutes: number // minutes
    classification: number
    synopsis: string
    releaseDate: Date
}

export class Movie extends Entity<MovieProps> {
    constructor(props: MovieProps, id?: string) {
        super(props, id)
    }
}