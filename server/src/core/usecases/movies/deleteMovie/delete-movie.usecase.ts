import { MovieRepository } from './../../../repositories/movie.repository';

export class DeleteMovieUseCase {
    constructor(private movieRepository: MovieRepository) { }

    async execute(movieId: string): Promise<void> {
        try {
            await this.movieRepository.delete(movieId);
        } catch (error) {
            throw error
        }
    }
}