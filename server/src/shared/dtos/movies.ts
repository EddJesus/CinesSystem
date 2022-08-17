export class CreateMovieDTO {
  public name: string
  public gender: string
  public durationInMinutes: number // minutes
  public classification: number
  public synopsis: string
  public releaseDate: string

  constructor(name: string, gender: string, durationInMinutes: number, classification: number, synopsis: string, releaseDate: string) {
    this.name = name
    this.gender = gender
    this.durationInMinutes = durationInMinutes
    this.classification = classification
    this.synopsis = synopsis
    this.releaseDate = releaseDate
  }
}

export class UpdateMovieDTO {
  public id: string
  public name?: string
  public gender?: string
  public durationInMinutes?: number // minutes
  public classification?: number
  public synopsis?: string
  public releaseDate?: string

  constructor(id: string, name?: string, gender?: string, durationInMinutes?: number, classification?: number, synopsis?: string, releaseDate?: string) {
    this.id = id
    this.name = name
    this.gender = gender
    this.durationInMinutes = durationInMinutes
    this.classification = classification
    this.synopsis = synopsis
    this.releaseDate = releaseDate
  }
}