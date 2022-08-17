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

    get name(): string {
        return this.props.name
    }

    set name(name: string) {
        this.props.name = name
    }

    get gender(): string {
        return this.props.gender
    }

    set gender(gender: string){
        this.props.gender = gender
    }

    get durationInMinutes(): number {
        return this.props.durationInMinutes
    }

    set durationInMinutes(durationInMinutes: number){
        this.props.durationInMinutes = durationInMinutes
    }

    get classification(): number {
        return this.props.classification
    }

    set classification(classification: number){
        this.props.classification = classification
    }

    get synopsis(): string {
        return this.props.synopsis
    }

    set synopsis(synopsis: string){
        this.props.synopsis = synopsis
    }

    get releaseDate(): Date {
        return this.props.releaseDate
    }
    
    set releaseDate(releaseDate: Date){
        this.props.releaseDate = releaseDate
    }
}