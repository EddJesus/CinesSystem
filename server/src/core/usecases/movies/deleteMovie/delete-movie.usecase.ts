import { MovieRepository } from './../../../repositories/movie.repository';

export class DeleteMovieUseCase {
    constructor(private movieRepository: MovieRepository) { }

    async execute(movieId: string): Promise<void> {
        try {
            const deletedMovie = await this.movieRepository.delete(movieId);
            console.log(deletedMovie.results.rows);
            if(deletedMovie.results.rows.length === 0) {
                throw new Error('Movie not found')
            }
            return deletedMovie
        } catch (error) {
            throw error
        }
    }
}