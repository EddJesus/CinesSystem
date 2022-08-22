import { Cine } from '../../../entities/Cine';
import { CineRepository } from '../../../repositories/cine.repository';

export class ListCinesUseCase {
    constructor(private cineRepository: CineRepository) { }

    async execute(): Promise<Cine[]> {
        try {
          const cines = await this.cineRepository.list();
          return cines
        } catch (error) {
          throw error
        }
    }
}