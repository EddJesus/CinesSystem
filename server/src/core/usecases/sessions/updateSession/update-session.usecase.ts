import { Session } from './../../../entities/Session';
import { UpdateSessionDTO } from 'shared/dtos/session';
import { SessionRepository } from './../../../repositories/session.repository';

export class UpdateSessionUseCase {
    constructor(private sessionRepository: SessionRepository) { }

    async execute(session: UpdateSessionDTO): Promise<Session> {
        try {
            let actualSession = await this.sessionRepository.getById(session.id);
            if (!actualSession) {
                throw new Error('Session not found');
            }

            const updateSessionObj = new Session({
                ...actualSession.props,
                ...session,
                date: session.date ? new Date(session.date) : actualSession.props.date
            }, session.id)

            const updatedSession = await this.sessionRepository.update(updateSessionObj);
            return updatedSession
        } catch (error) {
            throw error;
        }
    }
}