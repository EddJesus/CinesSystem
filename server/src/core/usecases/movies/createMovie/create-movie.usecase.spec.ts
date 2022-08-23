import { Movie } from '../../../entities/Movie';
import { makeMockMovie } from '../__mocks__/Movie';
import { MovieRepositoryInMemory } from './../../../../infra/repositories/movieRepository/movie.repository-in-memory';
import { CreateMovieUseCase } from "./create-movie.usecase";

describe('CreateMovieUsecase', () => {
  it('should be defined', () => {
    const movieRepositoryInMemory = new MovieRepositoryInMemory();
    const sut = new CreateMovieUseCase(movieRepositoryInMemory)

    expect(sut).toBeDefined();
  })

  it('should create a movie', async () => {
    const mockMovie: Movie = makeMockMovie()
    const movieRepositoryInMemory = new MovieRepositoryInMemory();
    const sut = new CreateMovieUseCase(movieRepositoryInMemory)

    const mockedMovie = await sut.execute(mockMovie)

    const movie = await movieRepositoryInMemory.getById(mockedMovie.id)

    expect(movie).toHaveProperty('id');
  })
})