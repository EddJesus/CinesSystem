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
}