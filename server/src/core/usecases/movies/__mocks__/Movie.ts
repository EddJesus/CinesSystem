import { Movie } from "../../../entities/Movie"

import { faker } from '@faker-js/faker';

export const makeMockMovie = (): Movie => {
  const movie: Movie = new Movie({
    name: faker.word.verb(),
    gender: 'Action',
    durationInMinutes: 120,
    synopsis: 'Movie Synopsis',
    releaseDate: new Date(),
    classification: 18,
  })

  return movie
}

