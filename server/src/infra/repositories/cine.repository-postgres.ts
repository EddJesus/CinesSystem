import { CineRepository } from '../../core/repositories/cine.repository';
import { PostgresClient } from '../clients/postgres-client';
import { Cine } from '../../core/entities/Cine';
import { CinemaDTO, cinemaProps } from './dtos/cinema.dto';

export class CineRepositoryPostgres implements CineRepository {
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

  async create(cine: Cine): Promise<Cine> {
    const connection = await this.postgresClient.connection();
    try {
      
      const cinemaObject = new CinemaDTO({
        nome: cine.name,
        cidade: cine.city,
        estado: cine.state
      })

      const sql = `
                    INSERT INTO cinema
                      (
                        nome,
                        cidade,
                        estado
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
        cinemaObject.props.nome,
        cinemaObject.props.cidade,
        cinemaObject.props.estado
      ]);

      if(results.rows.length === 0) {
        throw new Error('Erro while creating cine');
      }

      const cinema = results.rows[0] as cinemaProps;

      return new Cine({
        name: cinema.nome,
        city: cinema.cidade,
        state: cinema.estado
      }, String(cinema.id))
    } catch (error) {
      throw error; 
    } finally {
      connection.release()
    }
  }

  async getById(id: string): Promise<Cine> {
    const connection = await this.postgresClient.connection();
    try {
      const { results } = await this.postgresClient.query(connection, 'SELECT * FROM cinema WHERE id = $1', [id]);

      if(results.rows.length === 0) {
        throw new Error('Cine not found');
      }

      const cinema = results.rows[0] as cinemaProps;

      return new Cine({
        name: cinema.nome,
        city: cinema.cidade,
        state: cinema.estado
      }, String(cinema.id))
    } catch (error) {
      throw error;
    } finally {
      connection.release()
    }
  }

  async list(): Promise<Cine[]> {
    const connection = await this.postgresClient.connection();
    try {
      const sql = `SELECT * FROM cinema`;

      const { results } = await this.postgresClient.query(connection, sql);

      if(results.rows.length === 0) {
        throw new Error('No movies found');
      }

      const filmes = results.rows as cinemaProps[];

      return filmes.map(cinema => new Cine(
        {
          name: cinema.nome,
          city: cinema.cidade,
          state: cinema.estado,
        }, 
        String(cinema.id))
      );
    } catch (error) {
      throw error;
    } finally {
      connection.release()
    }
  }

  async update(cine: Cine): Promise<Cine> {
    const connection = await this.postgresClient.connection();

    const cinemaObject = new CinemaDTO({
      nome: cine.name,
      cidade: cine.city,
      estado: cine.state
    })

    try {      
      const sql = `
                    UPDATE cinema
                    SET (
                        nome,
                        cidade,
                        estado
                      ) = (
                        $1,
                        $2,
                        $3
                      )
                    WHERE id = $4
                    RETURNING *
      `
      const { results } = await this.postgresClient.query(connection, sql, [
        cinemaObject.props.nome,
        cinemaObject.props.cidade,
        cinemaObject.props.estado,
        cine.id
      ]);

      if(results.rows.length === 0) {
        throw new Error('Erro while creating cine');
      }

      const cinema = results.rows[0] as cinemaProps;

      return new Cine({
        name: cinema.nome,
        city: cinema.cidade,
        state: cinema.estado,
      }, String(cinema.id))
    } catch (error) {
      throw error;
    } finally {
      connection.release()
    }
      
  }

  async delete(id: string): Promise<any> {
    const connection = await this.postgresClient.connection();

    try {
      const sql = `DELETE FROM cinema WHERE id = $1`;

      const { results } = await this.postgresClient.query(connection, sql, [id]);

      if(results.rowCount === 0) {
        throw new Error('Movie not found');
      }

      return true
    } catch (error) {
      throw error;
    } finally {
      connection.release()
    }
  }

}