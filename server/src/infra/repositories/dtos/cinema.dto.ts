export type cinemaProps = {
  id?: number
  nome: string
  cidade: string
  estado: string
}

export class CinemaDTO {
  public props: cinemaProps
  
  constructor(props: cinemaProps) {
    this.props = props
  }
}