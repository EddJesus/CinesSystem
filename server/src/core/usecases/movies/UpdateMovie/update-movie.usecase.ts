import { Movie } from './../../../entities/Movie';
import { MovieRepository } from './../../../repositories/movie.repository';

export class UpdateMovieUseCase {
    constructor(private movieRepository: MovieRepository) { }

    async execute(movie: Movie): Promise<Movie> {
        const updatedMovie = await this.movieRepository.update(movie);
        return updatedMovie
    }
}