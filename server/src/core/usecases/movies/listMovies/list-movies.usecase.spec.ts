import { MovieRepositoryInMemory } from "../../../../infra/repositories/movie.repository-in-memory";
import { Movie } from "../../../entities/Movie";
import { makeMockMovie } from "../__mocks__/Movie";
import { ListMoviesUseCase } from "./list-movies.usecase";

describe('ListMoviesUsecase', () => {
  it('should be defined', () => {
    const movieRepositoryInMemory = new MovieRepositoryInMemory();
    const sut = new ListMoviesUseCase(movieRepositoryInMemory)

    expect(sut).toBeDefined();
  })

  it('should list all movies', async () => {
    const movieRepositoryInMemory = new MovieRepositoryInMemory();
    const sut = new ListMoviesUseCase(movieRepositoryInMemory)

    const movie1: Movie = makeMockMovie()
    const movie2: Movie = makeMockMovie()

    await movieRepositoryInMemory.create(movie1)
    await movieRepositoryInMemory.create(movie2)

    const movies = await sut.execute()
    
    expect(movies).toHaveLength(2)
  })
})