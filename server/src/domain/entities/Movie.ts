import { Entity } from "../../core/domain/Entity";

type MovieProps = {
    title: string
    gender: string
    duration: string
    rating: string
    description: string
    release: string
}

export class Movie extends Entity<MovieProps> {
    constructor(props: MovieProps, id?: string) {
        super(props, id)
    }
}