import { MovieRepositoryInMemory } from "../../../../infra/repositories/movieRepository/movie.repository-in-memory";
import { Movie } from "../../../entities/Movie";
import { makeMockMovie } from "../__mocks__/Movie";
import { GetMovieUseCase } from "./get-movie.usecase";

describe('getMovieUseCase', () => {
  it('should be defined', () => {
    const movieRepositoryInMemory = new MovieRepositoryInMemory();
    const sut = new GetMovieUseCase(movieRepositoryInMemory)

    expect(sut).toBeDefined();
  })

  it('should get a movie', async () => {
    const movie: Movie = makeMockMovie()
    const movieRepositoryInMemory = new MovieRepositoryInMemory();
    await movieRepositoryInMemory.create(movie)
    const sut = new GetMovieUseCase(movieRepositoryInMemory)

    const mockedMovie = await sut.execute(movie.id)

    expect(mockedMovie).toBeInstanceOf(Movie);
  })

  it('should throw an error if movie not found', async () => {
    const invalidId = 'invalid-id'
    const movieRepositoryInMemory = new MovieRepositoryInMemory();
    const sut = new GetMovieUseCase(movieRepositoryInMemory)

    await expect(sut.execute(invalidId)).rejects.toThrowError(`Movie with id ${invalidId} not found`)
  })
})