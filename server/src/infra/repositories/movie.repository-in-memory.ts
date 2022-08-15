import { Movie } from "../../core/entities/Movie";
import { MovieRepository } from "../../core/repositories/movie.repository";

export class MovieRepositoryInMemory implements MovieRepository {
    private movies: Movie[] = [];
    async create(movie: Movie): Promise<Movie> {
        const createdMovie = new Movie(movie.props);
        this.movies.push(createdMovie);
        return createdMovie;
    }

    async getById(id: string): Promise<Movie> {
        const movie = this.movies.find(movie => movie.id === id);
        if (!movie) {
            throw new Error(`Movie with id ${id} not found`);
        }
        return movie;
    }

    async list(): Promise<Movie[]> {
        return this.movies;
    }

    async update(movie: Movie): Promise<Movie> {
        const index = this.movies.findIndex(movie => movie.id === movie.id);
        if (index === -1) {
            throw new Error(`Movie with id ${movie.id} not found`);
        }
        this.movies[index] = movie;
        return movie;
    }
    
    async delete(id: string): Promise<void> {
        const index = this.movies.findIndex(movie => movie.id === id);
        if (index === -1) {
            throw new Error(`Movie with id ${id} not found`);
        }
        this.movies.splice(index, 1);
    }
}