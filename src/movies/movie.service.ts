import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Movie } from './movie.schema';
import { Model } from 'mongoose';
import { CreateMovieDto } from './dto/movie.dto';
import { UpdateMovieDto } from './dto/update.dto';
import { SearchMovieDto } from './dto/search.dto';

//TODO: Write return types for all functions

@Injectable()
export class MovieService {
  constructor(@InjectModel(Movie.name) private movieModel: Model<Movie>) {}

  async findAll(): Promise<Movie[]> {
    return this.movieModel.find().exec();
  }

  async addMovie(movieDetails: CreateMovieDto): Promise<Movie> {
    const { title, link } = movieDetails;

    const existingRecord = await this.movieModel.find({ title, link });

    if (existingRecord.length) {
      throw new BadRequestException(
        'A movie with this title and streaming link already exists',
      );
    }

    try {
      const newMovie = await this.movieModel.create({
        ...movieDetails,
        createdAt: Date.now(),
      });
      return newMovie;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async update(movieDetails: UpdateMovieDto, id: string): Promise<Movie> {
    const { title, link } = movieDetails;

    const existingRecord = await this.movieModel.find({ title, link });

    if (existingRecord.length) {
      throw new BadRequestException(
        'A movie with this title and streaming link already exists',
      );
    }
    const movie = await this.movieModel.findByIdAndUpdate(id, movieDetails, {
      new: true,
    });

    if (!movie) {
      throw new NotFoundException();
    }
    return movie;
  }

  async deleteMovie(id: string) {
    try {
      const movie = await this.movieModel.findByIdAndDelete(id);
      if (!movie) {
        throw new NotFoundException('Movie with given ID not found');
      }
      return 'Movie deleted successfully';
    } catch (error) {
      console.error(error);
      if (error.name === 'BSONError' || error.name === 'CastError') {
        throw new BadRequestException('Invalid movie ID format');
      } else {
        throw new InternalServerErrorException('Error deleting movie');
      }
    }
  }

  async searchMovie(params: SearchMovieDto) {
    const query: any = {};

    if (params.title) {
      query.title = params.title;
    }

    if (params.genre) {
      query.genre = params.genre;
    }
    try {
      const movies = await this.movieModel.find(query).exec();
      return movies;
    } catch (error) {
      throw error;
    }
  }
}
