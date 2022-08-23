import { Session } from './../../../entities/Session';
import { SessionRepository } from './../../../repositories/session.repository';

export class GetSessionUseCase {
    constructor(private sessionRepository: SessionRepository) { }

    async execute(id: string): Promise<Session> {
      try {
        const session = await this.sessionRepository.getById(id);
        return session
      } catch (error) {
        throw error
      }
    }
}