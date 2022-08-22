import { CineRepositoryInMemory } from "../../../../infra/repositories/cine.repository-in-memory";
import { Cine } from "../../../entities/Cine";
import { makeMockCine } from "../__mocks__/Cine";
import { GetCineUseCase } from "./get-cine.usecase";

describe('getCineUseCase', () => {
  it('should be defined', () => {
    const cineRepositoryInMemory = new CineRepositoryInMemory();
    const sut = new GetCineUseCase(cineRepositoryInMemory)

    expect(sut).toBeDefined();
  })

  it('should get a cine', async () => {
    const cine: Cine = makeMockCine()
    const cineRepositoryInMemory = new CineRepositoryInMemory();
    await cineRepositoryInMemory.create(cine)
    const sut = new GetCineUseCase(cineRepositoryInMemory)

    const mockedCine = await sut.execute(cine.id)

    expect(mockedCine).toBeInstanceOf(Cine);
  })

  it('should throw an error if cine not found', async () => {
    const invalidId = 'invalid-id'
    const cineRepositoryInMemory = new CineRepositoryInMemory();
    const sut = new GetCineUseCase(cineRepositoryInMemory)

    await expect(sut.execute(invalidId)).rejects.toThrowError(`Cine with id ${invalidId} not found`)
  })
})