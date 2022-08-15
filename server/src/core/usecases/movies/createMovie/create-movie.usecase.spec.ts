import { Movie } from '../../../entities/Movie';
import { MovieRepositoryInMemory } from './../../../../infra/repositories/movie.repository-in-memory';
import { CreateMovieUseCase } from "./create-movie.usecase";

describe('CreateMovieUsecase', () => {
  it('should be defined', () => {
    const movieRepositoryInMemory = new MovieRepositoryInMemory();
    const sut = new CreateMovieUseCase(movieRepositoryInMemory)

    expect(sut).toBeDefined();
  })

  it('should create a movie', async () => {
    const movieRepositoryInMemory = new MovieRepositoryInMemory();
    const sut = new CreateMovieUseCase(movieRepositoryInMemory)

    const mockMovie: Movie = new Movie({
      name: 'Movie 1',
      gender: 'horror',
      durationInMinutes: 120,
      synopsis: 'Movie Synopsis',
      releaseDate: new Date(),
      classification: 18,
    })

    const mockedMovie = await sut.execute(mockMovie)

    const movie = await movieRepositoryInMemory.getById(mockedMovie.id)

    expect(movie).toHaveProperty('id');
  })
})