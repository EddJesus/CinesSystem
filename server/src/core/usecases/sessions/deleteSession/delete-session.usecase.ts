import { SessionRepository } from '../../../repositories/session.repository';

export class DeleteSessionUseCase {
    constructor(private sessionRepository: SessionRepository) { }

    async execute(sessionId: string): Promise<void> {
        try {
            await this.sessionRepository.delete(sessionId);
        } catch (error) {
            throw error
        }
    }
}