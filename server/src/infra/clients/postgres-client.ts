import { Pool, PoolConfig, PoolClient } from 'pg'

export class PostgresClient {
  private pool: Pool;

  constructor(config: PoolConfig) {
    this.pool = new Pool(config);
  }

  async connection(): Promise<PoolClient> {
    return await this.pool.connect();
  }

  async query(connection: PoolClient, query: string, values: any[] = []): Promise<any> {
    return new Promise((resolve, reject) => {
      connection.query(query, values, (error, results) => {
        if (error) {
          return connection.query('ROLLBACK',(rolbackError) => {
            if(rolbackError){
              return reject('Error on rollback');
            }
            reject(error);
          });
        }

        resolve({ results });
      });
    });
  }

}