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
}