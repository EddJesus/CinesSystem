import { Movie } from './../../../entities/Movie';
import { MovieRepository } from './../../../repositories/movie.repository';

export class ListMoviesUseCase {
    constructor(private movieRepository: MovieRepository) { }

    async execute(): Promise<Movie[]> {
      const movies = await this.movieRepository.list();
      return movies
    }
}