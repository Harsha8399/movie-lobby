import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './movie.dto';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
