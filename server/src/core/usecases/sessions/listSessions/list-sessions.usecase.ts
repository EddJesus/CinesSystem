import { Session } from '../../../entities/Session';
import { SessionRepository } from '../../../repositories/session.repository';

export class ListSessionsUseCase {
    constructor(private sessionRepository: SessionRepository) { }

    async execute(): Promise<Session[]> {
        try {
          const session = await this.sessionRepository.list();
          return session
        } catch (error) {
          throw error
        }
    }
}