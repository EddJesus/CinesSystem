import { Movie } from './../../../entities/Movie';
import { MovieRepository } from './../../../repositories/movie.repository';

export class CreateMovieUseCase {
    constructor(private movieRepository: MovieRepository) { }

    async execute(movie: Movie): Promise<Movie> {
        try {
            const createdMovie = await this.movieRepository.create(movie);
            return createdMovie
        } catch (error) {
            throw error
        }
    }
}