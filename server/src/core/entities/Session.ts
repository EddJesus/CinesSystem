import { Entity } from "./Entity";
import { Cine } from "./Cine";
import { Movie } from "./Movie";

type SessionProps = {
  date: Date
  movie: Movie
  cine: Cine
}

export class Session extends Entity<SessionProps> {
    constructor(props: SessionProps, id?: string) {
        super(props, id)
    }

    get date(): Date {
        return this.props.date
    }

    get movie(): Movie {
        return this.props.movie
    }

    get cine(): Cine {
        return this.props.cine
    }

    set date(date: Date) {
        this.props.date = date
    }

    set movie(movie: Movie) {
        this.props.movie = movie
    }

    set cine(cine: Cine) {
        this.props.cine = cine
    }
}