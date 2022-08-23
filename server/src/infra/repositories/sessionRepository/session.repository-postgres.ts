import { SessionRepository } from '../../../core/repositories/session.repository';
import { CineRepository } from '../../../core/repositories/cine.repository';
import { MovieRepository } from '../../../core/repositories/movie.repository';
import { PostgresClient } from '../../clients/postgres-client';
import { Session } from '../../../core/entities/Session';
import { SessaoDTO, sessaoProps } from '../dtos/sessao.dto';

export class SessionRepositoryPostgres implements SessionRepository {
  private postgresClient: PostgresClient;
  
  constructor(
      private cineRepository: CineRepository,
      private movieRepository: MovieRepository,
    ) {
    this.postgresClient = new PostgresClient({
      user: 'eduardo',
      host: 'localhost',
      database: 'fiusmark',
      password: 'eduardo123',
      port: 5432
    })
  }

  async create(session: Session): Promise<Session> {
    const connection = await this.postgresClient.connection();
    try {

      const sessaoObject = new SessaoDTO({
        horario: session.date,
        filmeId: Number(session.movie.id),
        cinemaId: Number(session.cine.id)
      })

      const sql = `
                    INSERT INTO sessao
                      (
                        horario,
                        filme_id,
                        cinema_id
                      )
                    VALUES 
                      (
                        $1, 
                        $2, 
                        $3
                      ) 
                    RETURNING *
      `
      const { results } = await this.postgresClient.query(connection, sql, [
        sessaoObject.props.horario,
        sessaoObject.props.filmeId,
        sessaoObject.props.cinemaId
      ]);

      if(results.rows.length === 0) {
        throw new Error('Erro while creating sessao');
      }

      const sessao: sessaoProps = { ...results.rows[0], filmeId: results.rows[0].filme_id, cinemaId: results.rows[0].cinema_id };

      const cine = await this.cineRepository.getById(String(sessao.cinemaId))
      const movie = await this.movieRepository.getById(String(sessao.filmeId))

      return new Session({
        date: new Date(sessao.horario),
        movie: movie,
        cine: cine
      }, String(sessao.id))
    } catch (error) {
      throw error; 
    } finally {
      connection.release()
    }
  }

  async getById(id: string): Promise<Session> {
    const connection = await this.postgresClient.connection();
    try {
      const { results } = await this.postgresClient.query(connection, 'SELECT * FROM sessao WHERE id = $1', [id]);

      if(results.rows.length === 0) {
        throw new Error('Session not found');
      }

      const sessao = results.rows[0] as sessaoProps;

      // @ts-ignore
      const cine = await this.cineRepository.getById(String(sessao.cinema_id))
      // @ts-ignore
      const movie = await this.movieRepository.getById(String(sessao.filme_id))

      return new Session({
        date: new Date(sessao.horario),
        movie: movie,
        cine: cine
      }, String(sessao.id))
    } catch (error) {
      throw error;
    } finally {
      connection.release()
    }
  }

  async list(): Promise<Session[]> {
    const connection = await this.postgresClient.connection();
    try {
      const sql = `SELECT * FROM sessao`;

      const { results } = await this.postgresClient.query(connection, sql);

      if(results.rows.length === 0) {
        throw new Error('No sessions found');
      }

      const sessoes = results.rows as sessaoProps[];

      const sessoesList: Session[] = [];

      for (const sessao of sessoes) {
        // @ts-ignore
        const cine = await this.cineRepository.getById(String(sessao.cinema_id))
        // @ts-ignore
        const movie = await this.movieRepository.getById(String(sessao.filme_id))

        const session = new Session({
          date: new Date(sessao.horario),
          movie: movie,
          cine: cine
        }, String(sessao.id))

        sessoesList.push(session)
      }

      return sessoesList
    } catch (error) {
      throw error;
    } finally {
      connection.release()
    }
  }

  async update(session: Session): Promise<Session> {
    const connection = await this.postgresClient.connection();

    const sessaoObject = new SessaoDTO({
      horario: session.date,
      filmeId: Number(session.movie.id),
      cinemaId: Number(session.cine.id)
    })

    try {      
      const sql = `
                    UPDATE sessao
                    SET (
                        horario,
                        filme_id,
                        cinema_id
                      ) = (
                        $1,
                        $2,
                        $3
                      )
                    WHERE id = $4
                    RETURNING *
      `
      const { results } = await this.postgresClient.query(connection, sql, [
        sessaoObject.props.horario,
        sessaoObject.props.filmeId,
        sessaoObject.props.cinemaId,
        session.id
      ]);

      if(results.rows.length === 0) {
        throw new Error('Erro while creating sessao');
      }

      const sessao = results.rows[0] as sessaoProps;

      // @ts-ignore
      const cine = await this.cineRepository.getById(String(sessao.cinema_id))
      // @ts-ignore
      const movie = await this.movieRepository.getById(String(sessao.filme_id))

      return new Session({
        date: new Date(sessao.horario),
        movie: movie,
        cine: cine
      }, String(sessao.id))
    } catch (error) {
      throw error;
    } finally {
      connection.release()
    }
      
  }

  async delete(id: string): Promise<any> {
    const connection = await this.postgresClient.connection();

    try {
      const sql = `DELETE FROM sessao WHERE id = $1`;

      const { results } = await this.postgresClient.query(connection, sql, [id]);

      if(results.rowCount === 0) {
        throw new Error('Session not found');
      }

      return true
    } catch (error) {
      throw error;
    } finally {
      connection.release()
    }
  }

}