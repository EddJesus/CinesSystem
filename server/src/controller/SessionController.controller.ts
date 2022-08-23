import { CreateSessionUseCase, DeleteSessionUseCase, GetSessionUseCase, UpdateSessionUseCase, ListSessionsUseCase } from '../core/usecases/sessions'
import { SessionRepositoryPostgres } from '../infra/repositories/session.repository-postgres';
import { CineRepositoryPostgres } from '../infra/repositories/cine.repository-postgres';
import { MovieRepositoryPostgres } from '../infra/repositories/movie.repository-postgres';
import { Session } from '../core/entities/Session';
import { CreateSessionDTO, UpdateSessionDTO } from 'shared/dtos/session';

export class SessionController {
  constructor() {}

  static async getSession(params: any, body: any) {
    try {
      const cineRepository = new CineRepositoryPostgres()
      const movieRepository = new MovieRepositoryPostgres()
      const sessionRepository = new SessionRepositoryPostgres(cineRepository, movieRepository);
      const getMovieUseCase = new GetSessionUseCase(sessionRepository);
      const session = await getMovieUseCase.execute(params.id);
      return session;
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Erro no servidor'
      }
    }
  }

  static async listSessions(params: any, body: any) {
    try {
      const cineRepository = new CineRepositoryPostgres()
      const movieRepository = new MovieRepositoryPostgres()
      const sessionRepository = new SessionRepositoryPostgres(cineRepository, movieRepository);
      const listMoviesUseCase = new ListSessionsUseCase(sessionRepository);
      const movies = await listMoviesUseCase.execute();
      return movies;
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Erro no servidor'
      }
    }
  }

  static async createSession(params: any, body: CreateSessionDTO) {
    try {
      const cineRepository = new CineRepositoryPostgres()
      const movieRepository = new MovieRepositoryPostgres()
      const sessionRepository = new SessionRepositoryPostgres(cineRepository, movieRepository);
      const createMovieUseCase = new CreateSessionUseCase(sessionRepository);

      const movie = await movieRepository.getById(String(body.movieId));

      if (!movie) {
        throw new Error('Movie not found');
      }

      const cine = await cineRepository.getById(String(body.cineId));
      if (!cine) {
        throw new Error('Cine not found');
      }

      const session = new Session({
        date: new Date (body.date),
        movie: movie,
        cine: cine
      });
      const result = await createMovieUseCase.execute(session);
      return result;
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Erro no servidor'
      }
    }
  }

  static async updateSession(params: any, body: Omit<UpdateSessionDTO, 'id'>) {
    try {
      const cineRepository = new CineRepositoryPostgres()
      const movieRepository = new MovieRepositoryPostgres()
      const sessionRepository = new SessionRepositoryPostgres(cineRepository, movieRepository);
      const updateMovieUseCase = new UpdateSessionUseCase(sessionRepository);
      const result = await updateMovieUseCase.execute({...body, id: params.id});
      return result
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Erro no servidor'
      }
    }
  }

  static async deleteSession(params: any, body: any) {
    try {
      const cineRepository = new CineRepositoryPostgres()
      const movieRepository = new MovieRepositoryPostgres()
      const sessionRepository = new SessionRepositoryPostgres(cineRepository, movieRepository);
      const deleteSessionUseCase = new DeleteSessionUseCase(sessionRepository);
      await deleteSessionUseCase.execute(params.id);
      return 'ok';
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Erro no servidor'
      }
    }
    
  }
}