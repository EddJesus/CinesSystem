import { SessionRepositoryInMemory } from "../../../../infra/repositories/sessionRepository/session.repository-in-memory";
import { Session } from "../../../entities/Session";
import { makeMockSession } from "../__mocks__/Session";
import { ListSessionsUseCase } from "./list-sessions.usecase";

describe('ListSessionsUsecase', () => {
  it('should be defined', () => {
    const sessionRepositoryInMemory = new SessionRepositoryInMemory();
    const sut = new ListSessionsUseCase(sessionRepositoryInMemory)

    expect(sut).toBeDefined();
  })

  it('should list all sessions', async () => {
    const sessionRepositoryInMemory = new SessionRepositoryInMemory();
    const sut = new ListSessionsUseCase(sessionRepositoryInMemory)

    const session1: Session = makeMockSession()
    const session2: Session = makeMockSession()

    await sessionRepositoryInMemory.create(session1)
    await sessionRepositoryInMemory.create(session2)

    const sessions = await sut.execute()
    
    expect(sessions).toHaveLength(2)
  })
})