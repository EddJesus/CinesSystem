import { CineRepositoryInMemory } from "../../../../infra/repositories/cine.repository-in-memory";
import { Cine } from "../../../entities/Cine";
import { makeMockCine } from "../__mocks__/Cine";
import { ListCinesUseCase } from "./list-cines.usecase";

describe('ListCinesUsecase', () => {
  it('should be defined', () => {
    const cineRepositoryInMemory = new CineRepositoryInMemory();
    const sut = new ListCinesUseCase(cineRepositoryInMemory)

    expect(sut).toBeDefined();
  })

  it('should list all cines', async () => {
    const cineRepositoryInMemory = new CineRepositoryInMemory();
    const sut = new ListCinesUseCase(cineRepositoryInMemory)

    const cine1: Cine = makeMockCine()
    const cine2: Cine = makeMockCine()

    await cineRepositoryInMemory.create(cine1)
    await cineRepositoryInMemory.create(cine2)

    const Cines = await sut.execute()
    
    expect(Cines).toHaveLength(2)
  })
})