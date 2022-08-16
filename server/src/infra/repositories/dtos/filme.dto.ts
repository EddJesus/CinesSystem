export type filmeProps = {
  id?: number
  nome: string
  genero: string
  duracao: number
  classificacao: number
  lancamento: string
  sinopse: string
}

export class FilmeDTO {
  public props: filmeProps
  
  constructor(props: filmeProps) {
    this.props = props
  }
}