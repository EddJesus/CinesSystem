export type sessaoProps = {
  id?: number
  horario: Date
  filmeId: number
  cinemaId: number
}

export class SessaoDTO {
  public props: sessaoProps
  
  constructor(props: sessaoProps) {
    this.props = props
  }
}