import { IsOptional, IsString } from 'class-validator';

export class SearchMovieDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  genre: string;
}
