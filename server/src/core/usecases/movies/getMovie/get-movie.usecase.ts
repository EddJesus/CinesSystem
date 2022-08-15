import { Movie } from './../../../entities/Movie';
import { MovieRepository } from './../../../repositories/movie.repository';

export class GetMovieUseCase {
    constructor(private movieRepository: MovieRepository) { }

    async execute(id: string): Promise<Movie> {
      const movie = await this.movieRepository.getById(id);
      return movie
    }
}