import { Cine } from "../../../../core/entities/Cine";
import { CineRepositoryInMemory } from "../../../../infra/repositories/cine.repository-in-memory";
import { makeMockCine } from "../__mocks__/Cine";
import { UpdateCineUseCase } from "./update-cine.usecase";

describe('updateCineUseCase', () => {
  it('should be defined', () => {
    const cineRepositoryInMemory = new CineRepositoryInMemory();
    const sut = new UpdateCineUseCase(cineRepositoryInMemory)

    expect(sut).toBeDefined();
  })

  it('should update a Cine', async () => {
    const mockCine: Cine = makeMockCine()
    const cineRepositoryInMemory = new CineRepositoryInMemory();
    await cineRepositoryInMemory.create(mockCine)
    const sut = new UpdateCineUseCase(cineRepositoryInMemory)

    const newName = 'New Name'

    const updatedCine = await sut.execute({id: mockCine.id, name: newName})

    const cine = await cineRepositoryInMemory.getById(updatedCine.id)

    expect(cine.props).toHaveProperty('name', newName);
  })

  it('should throw an error if Cine not found', async () => {
    const mockCine: Cine = makeMockCine()
    const cineRepositoryInMemory = new CineRepositoryInMemory();

    const sut = new UpdateCineUseCase(cineRepositoryInMemory)

    const newName = 'New Name'

    await expect(sut.execute({id: mockCine.id, name: newName})).rejects.toThrowError(`Cine with id ${mockCine.id} not found`)
  })
})