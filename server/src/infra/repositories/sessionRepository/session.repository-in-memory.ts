import { Session } from "../../../core/entities/Session";
import { SessionRepository } from "../../../core/repositories/session.repository";

export class SessionRepositoryInMemory implements SessionRepository {
    private sessions: Session[] = [];
    async create(session: Session): Promise<Session> {
        this.sessions.push(session);
        return session;
    }

    async getById(id: string): Promise<Session> {
        const session = this.sessions.find(session => session.id === id);
        if (!session) {
            throw new Error(`Session with id ${id} not found`);
        }
        return session;
    }

    async list(): Promise<Session[]> {
        return this.sessions;
    }

    async update(session: Session): Promise<Session> {
        const index = this.sessions.findIndex(session => session.id === session.id);
        if (index === -1) {
            throw new Error(`Session with id ${session.id} not found`);
        }
        this.sessions[index] = session;
        return session;
    }
    
    async delete(id: string): Promise<boolean> {
        const index = this.sessions.findIndex(session => session.id === id);
        if (index === -1) {
            throw new Error(`Session with id ${id} not found`);
        }
        this.sessions.splice(index, 1);
        return true
    }
}