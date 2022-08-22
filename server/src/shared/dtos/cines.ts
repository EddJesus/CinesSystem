export class CreateCineDTO {
  public name: string
  public city: string
  public state: string

  constructor(name: string, city: string, state: string) {
    this.name = name
    this.city = city
    this.state = state
  }
}

export class UpdateCineDTO {
  public id: string
  public name?: string
  public city?: string
  public state?: string

  constructor(id: string, name?: string, city?: string, state?: string) {
    this.id = id
    this.name = name
    this.city = city
    this.state = state
  }
}