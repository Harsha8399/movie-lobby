import { Test, TestingModule } from '@nestjs/testing';
import { MovieController } from '../movie.controller';
import { MovieService } from '../movie.service';
import { BadRequestException } from '@nestjs/common';

jest.mock('../movie.service');

describe('MovieController', () => {
  let controller: MovieController;
  let service: MovieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [MovieService],
    }).compile();

    controller = module.get<MovieController>(MovieController);
    service = module.get<MovieService>(MovieService);
  });

  describe('getAllMovies', () => {
    it('should return all movies', async () => {
      const moviesMock = [
        {
          title: 'Fading Hopes',
          genre: 'Drama',
          rating: '1',
          link: 'www.examplemovie.com/fading-hopes',
          description: '',
          createdAt: new Date('2024-03-09T13:00:00Z'),
          updatedAt: new Date('2024-03-09T13:00:00Z'),
        },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValueOnce(moviesMock);

      const result = await controller.getAllMovies();

      expect(result).toEqual({ movies: moviesMock });
    });
  });

  describe('create', () => {
    it('should create a new movie', async () => {
      const createMovieDto = {
        title: 'New Movie',
        link: 'http://example.com',
        genre: 'Drama',
        rating: '1',
        description: '',
        createdAt: new Date('2024-03-09T13:00:00Z'),
        updatedAt: new Date('2024-03-09T13:00:00Z'),
      };
      jest.spyOn(service, 'addMovie').mockResolvedValueOnce(createMovieDto);

      const result = await controller.create(createMovieDto);

      expect(result).toEqual({ result: createMovieDto });
    });
  });

  describe('update', () => {
    it('should update a movie by ID', async () => {
      const updateMovieDto = {
        title: 'Updated Movie',
        link: 'http://updated.com',
        genre: 'Drama',
        rating: '1',
        description: '',
        createdAt: new Date('2024-03-09T13:00:00Z'),
        updatedAt: new Date('2024-03-09T13:00:00Z'),
      };
      const movieId = '123';
      jest.spyOn(service, 'update').mockResolvedValueOnce(updateMovieDto);

      const result = await controller.update(updateMovieDto, movieId);

      expect(result).toEqual({ result: updateMovieDto });
    });
  });

  describe('delete', () => {
    it('should delete a movie by ID', async () => {
      const movieId = '123';
      jest
        .spyOn(service, 'deleteMovie')
        .mockResolvedValueOnce('Movie deleted successfully');

      const result = await controller.delete(movieId);

      expect(result).toEqual({ status: 'Movie deleted successfully' });
    });

    it('should fail to delete a movie without movieId', async () => {
      const movieId = undefined;
      jest
        .spyOn(service, 'deleteMovie')
        .mockResolvedValueOnce('Movie deleted successfully');

      try {
        await controller.delete(movieId);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });
});
