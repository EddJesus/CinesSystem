import { Session } from "core/entities/Session";
import { SessionRepository } from "core/repositories/session.repository";

export class CreateSessionUseCase {
    constructor(private sessionRepository: SessionRepository) { }

    async execute(session: Session): Promise<Session> {
        try {
            const createdSession = await this.sessionRepository.create(session);
            return createdSession
        } catch (error) {
            throw error
        }
    }
}