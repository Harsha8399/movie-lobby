import { Controller, Get, Query } from '@nestjs/common';
import { MovieService } from './movie.service';
import { SearchMovieDto } from './dto/search.dto';

@Controller('search')
export class SearchController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  async getAllMovies(@Query() params: SearchMovieDto) {
    const movies = await this.movieService.searchMovie(params);
    return { movies };
  }
}
