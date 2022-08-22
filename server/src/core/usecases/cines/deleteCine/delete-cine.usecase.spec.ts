import { CineRepositoryInMemory } from '../../../../infra/repositories/cine.repository-in-memory';
import { makeMockCine } from "../__mocks__/Cine";
import { DeleteCineUseCase } from "./delete-cine.usecase";
import { Cine } from '../../../entities/Cine';

describe('deleteMovieUseCase', () => {
  it('should be defined', () => {
    const cineRepository = new CineRepositoryInMemory();
    const sut = new DeleteCineUseCase(cineRepository)

    expect(sut).toBeDefined();
  })

  it('should delete a cine', async () => {
    const mockCine: Cine = makeMockCine()
    const cineRepository = new CineRepositoryInMemory();
    await cineRepository.create(mockCine)
    const sut = new DeleteCineUseCase(cineRepository)

    await sut.execute(mockCine.id)
    const cine = cineRepository.getById(mockCine.id)

    expect(cine).rejects.toThrowError(`Cine with id ${mockCine.id} not found`)
  })

  it('should throw an error if cine not found', async () => {
    const mockedCineId = '123'
    const cineRepository = new CineRepositoryInMemory();
    const sut = new DeleteCineUseCase(cineRepository)

    const result = sut.execute(mockedCineId)

    expect(result).rejects.toThrowError(`Cine with id ${mockedCineId} not found`)
  })
})