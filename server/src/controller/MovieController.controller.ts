import { CreateMovieUseCase, DeleteMovieUseCase, GetMovieUseCase, UpdateMovieUseCase } from '../core/usecases/movies'
import { MovieRepositoryPostgres } from '../infra/repositories/movie.repository-postgres';
import { ListMoviesUseCase } from '../core/usecases/movies/listMovies/list-movies.usecase';
import { Movie } from '../core/entities/Movie';
import { CreateMovieDTO, UpdateMovieDTO } from 'shared/dtos/movies';

export class MovieController {
  constructor() {}

  static async getMovie(params: any, body: any) {
    try {
      const movieRepository = new MovieRepositoryPostgres();
      const getMovieUseCase = new GetMovieUseCase(movieRepository);
      const movie = await getMovieUseCase.execute(params.id);
      return movie;
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Erro no servidor'
      }
    }
  }

  static async listMovies(params: any, body: any) {
    try {
      const movieRepository = new MovieRepositoryPostgres();
      const listMoviesUseCase = new ListMoviesUseCase(movieRepository);
      const movies = await listMoviesUseCase.execute();
      return movies;
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Erro no servidor'
      }
    }
  }

  static async createMovie(params: any, body: CreateMovieDTO) {
    try {
      const movieRepository = new MovieRepositoryPostgres();
      const createMovieUseCase = new CreateMovieUseCase(movieRepository);
      const movie = new Movie({
        name: body.name,
        gender: body.gender,
        durationInMinutes: body.durationInMinutes,
        classification: body.classification,
        synopsis: body.synopsis,
        releaseDate: new Date(body.releaseDate)
      });
      const result = await createMovieUseCase.execute(movie);
      return result;
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Erro no servidor'
      }
    }
  }

  static async updateMovie(params: any, body: Omit<UpdateMovieDTO, 'id'>) {
    try {
      const movieRepository = new MovieRepositoryPostgres();
      const updateMovieUseCase = new UpdateMovieUseCase(movieRepository);
      const result = await updateMovieUseCase.execute({...body, id: params.id});
      return result
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Erro no servidor'
      }
    }
  }

  static async deleteMovie(params: any, body: any) {
    try {
      const movieRepository = new MovieRepositoryPostgres();
      const deleteMovieUseCase = new DeleteMovieUseCase(movieRepository);
      const result = await deleteMovieUseCase.execute(params.id);
      return 'ok';
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Erro no servidor'
      }
    }
    
  }
}