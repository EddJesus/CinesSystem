import { Cine } from "../../../entities/Cine"

import { faker } from '@faker-js/faker';

export const makeMockCine = (): Cine => {
  const movie: Cine = new Cine({
    name: faker.word.verb(),
    city: 'São Paulo',
    state: 'SP',
  })

  return movie
}

