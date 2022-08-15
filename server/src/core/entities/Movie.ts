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

    set name(name: string) {
        this.props.name = name
    }

    set gender(gender: string){
        this.props.gender = gender
    }

    set durationInMinutes(durationInMinutes: number){
        this.props.durationInMinutes = durationInMinutes
    }

    set classification(classification: number){
        this.props.classification = classification
    }

    set synopsis(synopsis: string){
        this.props.synopsis = synopsis
    }

    set releaseDate(releaseDate: Date){
        this.props.releaseDate = releaseDate
    }
}