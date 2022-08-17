import { Movie } from "../entities/Movie";

export interface MovieRepository {
  create(movie: Movie): Promise<Movie>;
  getById(id: string): Promise<Movie>;
  list(): Promise<Movie[]>;
  update(movie: Movie): Promise<Movie>;
  delete(id: string): Promise<any>;
}