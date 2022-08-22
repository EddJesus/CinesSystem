import { Cine } from './../../../entities/Cine';
import { CineRepository } from './../../../repositories/cine.repository';

export class GetCineUseCase {
    constructor(private cineRepository: CineRepository) { }

    async execute(id: string): Promise<Cine> {
      try {
        const cine = await this.cineRepository.getById(id);
        return cine
      } catch (error) {
        throw error
      }
    }
}