import { MovieRepositoryInMemory } from '../../../../infra/repositories/movieRepository/movie.repository-in-memory';
import { makeMockMovie } from "../__mocks__/Movie";
import { DeleteMovieUseCase } from "./delete-movie.usecase";
import { Movie } from '../../../entities/Movie';

describe('deleteMovieUseCase', () => {
  it('should be defined', () => {
    const movieRepositoryInMemory = new MovieRepositoryInMemory();
    const sut = new DeleteMovieUseCase(movieRepositoryInMemory)

    expect(sut).toBeDefined();
  })

  it('should delete a movie', async () => {
    const mockMovie: Movie = makeMockMovie()
    const movieRepositoryInMemory = new MovieRepositoryInMemory();
    await movieRepositoryInMemory.create(mockMovie)
    const sut = new DeleteMovieUseCase(movieRepositoryInMemory)

    await sut.execute(mockMovie.id)
    const movie = movieRepositoryInMemory.getById(mockMovie.id)


    expect(movie).rejects.toThrowError(`Movie with id ${mockMovie.id} not found`)
  })

  it('should throw an error if movie not found', async () => {
    const mockedMovieId = '123'
    const movieRepositoryInMemory = new MovieRepositoryInMemory();
    const sut = new DeleteMovieUseCase(movieRepositoryInMemory)

    const result = sut.execute(mockedMovieId)

    expect(result).rejects.toThrowError(`Movie with id ${mockedMovieId} not found`)
  })
})