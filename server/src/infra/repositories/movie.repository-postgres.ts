import { MovieRepository } from '../../core/repositories/movie.repository';
import { PostgresClient } from '../clients/postgres-client';
import { Movie } from '../../core/entities/Movie';
import { FilmeDTO, filmeProps } from './dtos/filme.dto';

export class MovieRepositoryPostgres implements MovieRepository {
  private postgresClient: PostgresClient;
  
  constructor() {
    this.postgresClient = new PostgresClient({
      user: 'eduardo',
      host: 'localhost',
      database: 'fiusmark',
      password: 'eduardo123',
      port: 5432
    })
  }

  async create(movie: Movie): Promise<Movie> {
    const connection = await this.postgresClient.connection();
    try {
      
      const filmeObject = new FilmeDTO({
        nome: movie.name,
        genero: movie.gender,
        duracao: movie.durationInMinutes,
        classificacao: movie.classification,
        sinopse: movie.synopsis,
        lancamento: movie.releaseDate.toISOString()
      })

      const sql = `
                    INSERT INTO filme
                      (
                        nome,
                        genero,
                        duracao,
                        classificacao,
                        lancamento,
                        sinopse
                      )
                    VALUES 
                      (
                        $1, 
                        $2, 
                        $3, 
                        $4,
                        $5,
                        $6
                      ) 
                    RETURNING *
      `
      const { results } = await this.postgresClient.query(connection, sql, [
        filmeObject.props.nome,
        filmeObject.props.genero,
        filmeObject.props.duracao,
        filmeObject.props.classificacao,
        filmeObject.props.lancamento,
        filmeObject.props.sinopse
      ]);

      if(results.rows.length === 0) {
        throw new Error('Erro while creating movie');
      }

      const filme = results.rows[0] as filmeProps;

      return new Movie({
        name: filme.nome,
        gender: filme.genero,
        durationInMinutes: filme.duracao,
        classification: filme.classificacao,
        releaseDate: new Date(filme.lancamento),
        synopsis: filme.sinopse
      }, String(filme.id))
    } catch (error) {
      throw error; 
    } finally {
      connection.release()
    }
  }

  async getById(id: string): Promise<Movie> {
    const connection = await this.postgresClient.connection();
    try {
      const { results } = await this.postgresClient.query(connection, 'SELECT * FROM filme WHERE id = $1', [id]);

      if(results.rows.length === 0) {
        throw new Error('Movie not found');
      }

      const filme = results.rows[0] as filmeProps;

      return new Movie({
        name: filme.nome,
        gender: filme.genero,
        durationInMinutes: filme.duracao,
        classification: filme.classificacao,
        releaseDate: new Date(filme.lancamento),
        synopsis: filme.sinopse
      }, String(filme.id))
    } catch (error) {
      throw error;
    } finally {
      connection.release()
    }
  }

  async list(): Promise<Movie[]> {
    const connection = await this.postgresClient.connection();
    try {
      const sql = `SELECT * FROM filme`;

      const { results } = await this.postgresClient.query(connection, sql);

      if(results.rows.length === 0) {
        throw new Error('No movies found');
      }

      const filmes = results.rows as filmeProps[];

      return filmes.map(filme => new Movie(
        {
          name: filme.nome,
          gender: filme.genero,
          durationInMinutes: filme.duracao,
          classification: filme.classificacao,
          releaseDate: new Date(filme.lancamento),
          synopsis: filme.sinopse
        }, 
        String(filme.id))
      );
    } catch (error) {
      throw error;
    } finally {
      connection.release()
    }
  }

  async update(movie: Movie): Promise<Movie> {
    const connection = await this.postgresClient.connection();

    const filmeObject = new FilmeDTO({
      nome: movie.name,
      genero: movie.gender,
      duracao: movie.durationInMinutes,
      classificacao: movie.classification,
      sinopse: movie.synopsis,
      lancamento: movie.releaseDate.toISOString()
    })

    try {      
      const sql = `
                    UPDATE filme
                    SET (
                        nome,
                        genero,
                        duracao,
                        classificacao,
                        lancamento,
                        sinopse
                      ) = (
                        $1,
                        $2,
                        $3,
                        $4,
                        $5,
                        $6
                      )
                    WHERE id = $7
                    RETURNING *
      `
      const { results } = await this.postgresClient.query(connection, sql, [
        filmeObject.props.nome,
        filmeObject.props.genero,
        filmeObject.props.duracao,
        filmeObject.props.classificacao,
        filmeObject.props.lancamento,
        filmeObject.props.sinopse,
        movie.id
      ]);

      if(results.rows.length === 0) {
        throw new Error('Erro while creating movie');
      }

      const filme = results.rows[0] as filmeProps;

      return new Movie({
        name: filme.nome,
        gender: filme.genero,
        durationInMinutes: filme.duracao,
        classification: filme.classificacao,
        releaseDate: new Date(filme.lancamento),
        synopsis: filme.sinopse
      }, String(filme.id))
    } catch (error) {
      throw error;
    } finally {
      connection.release()
    }
      
  }

  async delete(id: string): Promise<void> {
    const connection = await this.postgresClient.connection();

    try {
      const sql = `DELETE FROM filme WHERE id = $1`;

      return await this.postgresClient.query(connection, sql, [id]);
    } catch (error) {
      throw error;
    } finally {
      connection.release()
    }
  }

}