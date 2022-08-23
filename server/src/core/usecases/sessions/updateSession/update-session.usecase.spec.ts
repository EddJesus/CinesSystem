import { Session } from "../../../../core/entities/Session";
import { SessionRepositoryInMemory } from "../../../../infra/repositories/sessionRepository/session.repository-in-memory";
import { makeMockSession } from "../__mocks__/Session";
import { UpdateSessionUseCase } from "./update-session.usecase";

describe('updateCineUseCase', () => {
  it('should be defined', () => {
    const sessionRepositoryInMemory = new SessionRepositoryInMemory();
    const sut = new UpdateSessionUseCase(sessionRepositoryInMemory)

    expect(sut).toBeDefined();
  })

  it('should update a Session', async () => {
    const mockSession: Session = makeMockSession()
    const sessionRepositoryInMemory = new SessionRepositoryInMemory();
    await sessionRepositoryInMemory.create(mockSession)
    const sut = new UpdateSessionUseCase(sessionRepositoryInMemory)

    const newDate = new Date()

    const updatedSession = await sut.execute({
      id: mockSession.id,
      date: newDate.toISOString() 
    })

    const session = await sessionRepositoryInMemory.getById(updatedSession.id)

    expect(session.props).toHaveProperty('date', newDate);
  })

  it('should throw an error if Session not found', async () => {
    const mockSession: Session = makeMockSession()
    const sessionRepositoryInMemory = new SessionRepositoryInMemory();

    const sut = new UpdateSessionUseCase(sessionRepositoryInMemory)

    const newDate = new Date()

    await expect(sut.execute({
      id: mockSession.id, date: newDate.toISOString()
    })).rejects.toThrowError(`Session with id ${mockSession.id} not found`)
  })
})