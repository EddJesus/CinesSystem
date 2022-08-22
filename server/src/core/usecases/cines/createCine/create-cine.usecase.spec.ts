import { CineRepositoryPostgres } from '../../../../infra/repositories/cine.repository-postgres';
import { CreateCineUseCase } from './create-cine.usecase';
import { makeMockCine } from '../__mocks__/Cine';

describe('CreateCineUsecase', () => {
  test('should be defined', () => {
    const cineRespository = new CineRepositoryPostgres();
    const sut = new CreateCineUseCase(cineRespository);
    
    expect(sut).toBeDefined();
  })

  test('should create a cine', async () => {
    const cineRespository = new CineRepositoryPostgres();
    const sut = new CreateCineUseCase(cineRespository);
    const mockCine = makeMockCine();

    const cine = await sut.execute(mockCine);

    expect(cine).toBeDefined();
    expect(cine.id).toBeDefined();
  })
})