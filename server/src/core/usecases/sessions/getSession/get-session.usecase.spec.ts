import { SessionRepositoryInMemory } from "../../../../infra/repositories/session.repository-in-memory";
import { Session } from "../../../entities/Session";
import { makeMockSession } from "../__mocks__/Session";
import { GetSessionUseCase } from "./get-session.usecase";

describe('getSessionUseCase', () => {
  it('should be defined', () => {
    const sessionRepositoryInMemory = new SessionRepositoryInMemory();
    const sut = new GetSessionUseCase(sessionRepositoryInMemory)

    expect(sut).toBeDefined();
  })

  it('should get a session', async () => {
    const session: Session = makeMockSession()
    const sessionRepositoryInMemory = new SessionRepositoryInMemory();
    await sessionRepositoryInMemory.create(session)
    const sut = new GetSessionUseCase(sessionRepositoryInMemory)

    const mockedSession = await sut.execute(session.id)

    expect(mockedSession).toBeInstanceOf(Session);
  })

  it('should throw an error if session not found', async () => {
    const invalidId = 'invalid-id'
    const sessionRepositoryInMemory = new SessionRepositoryInMemory();
    const sut = new GetSessionUseCase(sessionRepositoryInMemory)

    await expect(sut.execute(invalidId)).rejects.toThrowError(`Session with id ${invalidId} not found`)
  })
})