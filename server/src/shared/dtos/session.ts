export class CreateSessionDTO {
  public date: string
  public movieId: number
  public cineId: number 

  constructor(date: string, movieId: number, cineId: number) {
    this.date = date
    this.movieId = movieId
    this.cineId = cineId
  }
}

export class UpdateSessionDTO {
  public id: string
  public date?: string
  public movieId?: number
  public cineId?: number

  constructor(id: string, date?: string, movieId?: number, cineId?: number) {
    this.id = id
    this.date = date
    this.movieId = movieId
    this.cineId = cineId
  }
}