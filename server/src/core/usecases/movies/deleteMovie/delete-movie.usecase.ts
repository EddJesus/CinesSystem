import { MovieRepository } from './../../../repositories/movie.repository';

export class DeleteMovieUseCase {
    constructor(private movieRepository: MovieRepository) { }

    async execute(movieId: string): Promise<void> {
        const deletedMovie = await this.movieRepository.delete(movieId);
        return deletedMovie
    }
}