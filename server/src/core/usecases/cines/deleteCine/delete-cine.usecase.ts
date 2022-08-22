import { CineRepository } from '../../../repositories/cine.repository';

export class DeleteCineUseCase {
    constructor(private cineRepository: CineRepository) { }

    async execute(cineId: string): Promise<void> {
        try {
            await this.cineRepository.delete(cineId);
        } catch (error) {
            throw error
        }
    }
}