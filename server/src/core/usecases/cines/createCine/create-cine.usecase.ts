import { Cine } from "core/entities/Cine";
import { CineRepository } from "core/repositories/cine.repository";

export class CreateCine {
    constructor(private cineRepository: CineRepository) { }

    async execute(cine: Cine): Promise<Cine> {
        try {
            const createdCine = await this.cineRepository.create(cine);
            return createdCine
        } catch (error) {
            throw error
        }
    }
}