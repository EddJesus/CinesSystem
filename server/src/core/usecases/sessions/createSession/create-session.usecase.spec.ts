import { SessionRepositoryInMemory } from '../../../../infra/repositories/session.repository-in-memory';
import { CreateSessionUseCase } from './create-session.usecase';
import { makeMockSession } from '../__mocks__/Session';

describe('CreateSessionUsecase', () => {
  test('should be defined', () => {
    const SessionRespository = new SessionRepositoryInMemory();
    const sut = new CreateSessionUseCase(SessionRespository);
    
    expect(sut).toBeDefined();
  })

  test('should create a Session', async () => {
    const SessionRespository = new SessionRepositoryInMemory();
    const sut = new CreateSessionUseCase(SessionRespository);
    const mockSession = makeMockSession();

    const session = await sut.execute(mockSession);

    expect(session).toBeDefined();
    expect(session.id).toBeDefined();
  })
})