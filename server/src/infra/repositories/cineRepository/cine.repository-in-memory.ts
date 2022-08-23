import { Cine } from "../../../core/entities/Cine";
import { CineRepository } from "../../../core/repositories/cine.repository";

export class CineRepositoryInMemory implements CineRepository {
    private cines: Cine[] = [];
    async create(cine: Cine): Promise<Cine> {
        this.cines.push(cine);
        return cine;
    }

    async getById(id: string): Promise<Cine> {
        const cine = this.cines.find(cine => cine.id === id);
        if (!cine) {
            throw new Error(`Cine with id ${id} not found`);
        }
        return cine;
    }

    async list(): Promise<Cine[]> {
        return this.cines;
    }

    async update(cine: Cine): Promise<Cine> {
        const index = this.cines.findIndex(cine => cine.id === cine.id);
        if (index === -1) {
            throw new Error(`Cine with id ${cine.id} not found`);
        }
        this.cines[index] = cine;
        return cine;
    }
    
    async delete(id: string): Promise<boolean> {
        const index = this.cines.findIndex(cine => cine.id === id);
        if (index === -1) {
            throw new Error(`Cine with id ${id} not found`);
        }
        this.cines.splice(index, 1);
        return true
    }
}