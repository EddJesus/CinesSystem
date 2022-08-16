import { MovieRepositoryPostgres } from "./movie.repository-postgres";
import { makeMockMovie } from '../../core/usecases/movies/__mocks__/Movie';

describe('MovieRepositoryPostgres', () => {
  let movieRepository: MovieRepositoryPostgres;

  beforeEach(() => {
    movieRepository = new MovieRepositoryPostgres();
  }),

  describe('create', () => {
    it('should create a movie', async () => {
      const mockedMovie = makeMockMovie()
  
      const movie = await movieRepository.create(mockedMovie)
  
      expect(movie).toBeDefined();
    })
  })

  describe('list', () => {
    it('should return all movies', async () => {
      const movies = await movieRepository.list();
  
      expect(movies).toBeDefined();
    })
  })

  describe('findById', () => {
    it('should return a movie by id', async () => {
      const mockedMovie = makeMockMovie()
  
      const movie = await movieRepository.create(mockedMovie)
  
      const movieFound = await movieRepository.getById(movie.id)
  
      expect(movieFound).toBeDefined();
      expect(movieFound.id).toBe(movie.id);
    })
  })

  describe('update', () => {
    it('should update a movie', async () => {
      const mockedMovie = makeMockMovie()
  
      const movie = await movieRepository.create(mockedMovie)
  
      const movieUpdated = await movieRepository.update(movie)
  
      expect(movieUpdated).toBeDefined();
      expect(movieUpdated.id).toBe(movie.id);
      expect(movieUpdated.name).toBe(movie.name);
    })
  })

  describe('delete', () => {
    it('should delete a movie', async () => {
      const mockedMovie = makeMockMovie()
  
      const movie = await movieRepository.create(mockedMovie)
  
      const movieDeleted = await movieRepository.delete(movie.id)
  
      const movieFound = movieRepository.getById(movie.id)
  
      expect(movieFound).rejects.toThrowError('Movie not found');
      expect(movieDeleted).toBeDefined();
    })
  })
})