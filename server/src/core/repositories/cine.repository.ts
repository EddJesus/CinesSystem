import { Cine } from "../entities/Cine";

export interface CineRepository {
  create(cine: Cine): Promise<Cine>;
  getById(id: string): Promise<Cine>;
  list(): Promise<Cine[]>;
  update(cine: Cine): Promise<Cine>;
  delete(id: string): Promise<boolean>;
}