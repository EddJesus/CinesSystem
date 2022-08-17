import { Movie } from './../../../entities/Movie';
import { UpdateMovieDTO } from 'dtos/movies';
import { MovieRepository } from './../../../repositories/movie.repository';

export class UpdateMovieUseCase {
    constructor(private movieRepository: MovieRepository) { }

    async execute(movie: UpdateMovieDTO): Promise<Movie> {
        let actualMovie = await this.movieRepository.getById(movie.id);
        if (!actualMovie) {
            throw new Error('Movie not found');
        }
        const updateMovieObj = new Movie({
            ...actualMovie.props,
            ...movie,
            releaseDate: movie.releaseDate ? new Date(movie.releaseDate) : actualMovie.props.releaseDate
        }, movie.id)
        const updatedMovie = await this.movieRepository.update(updateMovieObj);
        return updatedMovie
    }
}