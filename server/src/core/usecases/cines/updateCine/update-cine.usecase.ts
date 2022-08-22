import { Cine } from './../../../entities/Cine';
import { UpdateCineDTO } from 'shared/dtos/cines';
import { CineRepository } from './../../../repositories/cine.repository';

export class UpdateCineUseCase {
    constructor(private cineRepository: CineRepository) { }

    async execute(cine: UpdateCineDTO): Promise<Cine> {
        try {
            let actualCine = await this.cineRepository.getById(cine.id);
            if (!actualCine) {
                throw new Error('Cine not found');
            }

            const updateCineObj = new Cine({
                ...actualCine.props,
                ...cine,
            }, cine.id)

            const updatedCine = await this.cineRepository.update(updateCineObj);
            return updatedCine
        } catch (error) {
            throw error;
        }
    }
}