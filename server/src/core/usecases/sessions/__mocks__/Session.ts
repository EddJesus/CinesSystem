import { Session } from "../../../entities/Session"

import { faker } from '@faker-js/faker';
import { makeMockMovie } from "../../movies/__mocks__/Movie";
import { makeMockCine } from "../../cines/__mocks__/Cine";

export const makeMockSession = (): Session => {
  const movie: Session = new Session({
    date: faker.date.future(),
    movie: makeMockMovie(),
    cine: makeMockCine(),
  })

  return movie
}

