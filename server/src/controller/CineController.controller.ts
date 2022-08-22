import { CreateCineUseCase, DeleteCineUseCase, GetCineUseCase, UpdateCineUseCase, ListCinesUseCase } from '../core/usecases/cines'
import { CineRepositoryPostgres } from '../infra/repositories/cine.repository-postgres';
import { Cine } from '../core/entities/Cine';
import { CreateCineDTO, UpdateCineDTO } from 'shared/dtos/cines';

export class CineController {
  constructor() {}

  static async getCine(params: any, body: any) {
    try {
      const cineRepository = new CineRepositoryPostgres();
      const getCineUseCase = new GetCineUseCase(cineRepository);
      const cine = await getCineUseCase.execute(params.id);
      return cine;
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Erro no servidor'
      }
    }
  }

  static async listCines(params: any, body: any) {
    try {
      const cineRepository = new CineRepositoryPostgres();
      const listCinesUseCase = new ListCinesUseCase(cineRepository);
      const cines = await listCinesUseCase.execute();
      return cines;
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Erro no servidor'
      }
    }
  }

  static async createCine(params: any, body: CreateCineDTO) {
    try {
      const cineRepository = new CineRepositoryPostgres();
      const createCineUseCase = new CreateCineUseCase(cineRepository);
      const cine = new Cine({
        name: body.name,
        city: body.city,
        state: body.state,
      });
      const result = await createCineUseCase.execute(cine);
      return result;
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Erro no servidor'
      }
    }
  }

  static async updateCine(params: any, body: Omit<UpdateCineDTO, 'id'>) {
    try {
      const cineRepository = new CineRepositoryPostgres();
      const updateCineUseCase = new UpdateCineUseCase(cineRepository);
      const result = await updateCineUseCase.execute({...body, id: params.id});
      return result
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Erro no servidor'
      }
    }
  }

  static async deleteCine(params: any, body: any) {
    try {
      const cineRepository = new CineRepositoryPostgres();
      const deleteCineUseCase = new DeleteCineUseCase(cineRepository);
      const result = await deleteCineUseCase.execute(params.id);
      return 'ok';
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Erro no servidor'
      }
    }
    
  }
}