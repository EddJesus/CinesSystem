import { Movie } from "../../../../core/entities/Movie";
import { MovieRepositoryInMemory } from "../../../../infra/repositories/movieRepository/movie.repository-in-memory";
import { makeMockMovie } from "../__mocks__/Movie";
import { UpdateMovieUseCase } from "./update-movie.usecase";

describe('updateMovieUseCase', () => {
  it('should be defined', () => {
    const movieRepositoryInMemory = new MovieRepositoryInMemory();
    const sut = new UpdateMovieUseCase(movieRepositoryInMemory)

    expect(sut).toBeDefined();
  })

  it('should update a movie', async () => {
    const mockMovie: Movie = makeMockMovie()
    const movieRepositoryInMemory = new MovieRepositoryInMemory();
    await movieRepositoryInMemory.create(mockMovie)
    const sut = new UpdateMovieUseCase(movieRepositoryInMemory)

    const newName = 'New Name'

    const updatedMovie = await sut.execute({id: mockMovie.id, name: newName})
    const movie = await movieRepositoryInMemory.getById(updatedMovie.id)

    expect(movie.props).toHaveProperty('name', newName);
  })

  it('should throw an error if movie not found', async () => {
    const mockMovie: Movie = makeMockMovie()
    const movieRepositoryInMemory = new MovieRepositoryInMemory();

    const sut = new UpdateMovieUseCase(movieRepositoryInMemory)

    const newName = 'New Name'

    await expect(sut.execute({id: mockMovie.id, name: newName})).rejects.toThrowError(`Movie with id ${mockMovie.id} not found`)
  })
})