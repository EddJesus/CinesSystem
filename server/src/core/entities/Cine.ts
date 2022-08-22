import { Entity } from "./Entity";

type CineProps = {
  name: string
  city: string
  state: string
}

export class Cine extends Entity<CineProps> {
    constructor(props: CineProps, id?: string) {
        super(props, id)
    }

    get name(): string {
        return this.props.name
    }

    get city(): string {
        return this.props.city
    }

    get state(): string {
        return this.props.state
    }

    set name(name: string) {
        this.props.name = name
    }

    set city(city: string) {
        this.props.city = city
    }

    set state(state: string) {
        this.props.state = state
    }
}