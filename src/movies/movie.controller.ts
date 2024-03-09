import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/movie.dto';
import { UpdateMovieDto } from './dto/update.dto';
import { RoleGuard } from '../utils/roles.guard';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  async getAllMovies() {
    const movies = await this.movieService.findAll();
    return { movies };
  }

  @Post()
  @UseGuards(RoleGuard)
  async create(@Body() createMovieDto: CreateMovieDto) {
    const result = await this.movieService.addMovie(createMovieDto);
    return { result };
  }

  @Put(':id')
  @UseGuards(RoleGuard)
  async update(
    @Body() updateMovieDto: UpdateMovieDto,
    @Param('id') id: string,
  ) {
    const result = await this.movieService.update(updateMovieDto, id);
    return { result };
  }

  @Delete(':id')
  @UseGuards(RoleGuard)
  async delete(@Param('id') id: string) {
    const status = await this.movieService.deleteMovie(id);
    return { status };
  }
}
