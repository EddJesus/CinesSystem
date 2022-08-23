import { Session } from "../entities/Session";

export interface SessionRepository {
  create(session: Session): Promise<Session>;
  getById(id: string): Promise<Session>;
  list(): Promise<Session[]>;
  update(session: Session): Promise<Session>;
  delete(id: string): Promise<boolean>;
}