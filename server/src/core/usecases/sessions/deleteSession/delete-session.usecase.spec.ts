import { SessionRepositoryInMemory } from '../../../../infra/repositories/sessionRepository/session.repository-in-memory';
import { makeMockSession } from "../__mocks__/Session";
import { DeleteSessionUseCase } from "./delete-session.usecase";
import { Session } from '../../../entities/Session';

describe('deleteSessionUseCase', () => {
  it('should be defined', () => {
    const sessionRepository = new SessionRepositoryInMemory();
    const sut = new DeleteSessionUseCase(sessionRepository)

    expect(sut).toBeDefined();
  })

  it('should delete a session', async () => {
    const mockSession: Session = makeMockSession()
    const sessionRepository = new SessionRepositoryInMemory();
    await sessionRepository.create(mockSession)
    const sut = new DeleteSessionUseCase(sessionRepository)

    await sut.execute(mockSession.id)
    const session = sessionRepository.getById(mockSession.id)

    expect(session).rejects.toThrowError(`Session with id ${mockSession.id} not found`)
  })

  it('should throw an error if session not found', async () => {
    const mockedSessionId = '123'
    const sessionRepository = new SessionRepositoryInMemory();
    const sut = new DeleteSessionUseCase(sessionRepository)

    const result = sut.execute(mockedSessionId)

    expect(result).rejects.toThrowError(`Session with id ${mockedSessionId} not found`)
  })
})