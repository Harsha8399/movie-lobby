import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

// Movie, genre, title, rating, streaming link, id

export type MovieDocument = HydratedDocument<Movie>;

@Schema()
export class Movie {
  @Prop()
  title: string;

  @Prop()
  genre: string;

  @Prop()
  rating: string;

  @Prop()
  link: string;

  @Prop()
  description: string;

  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now() })
  updatedAt: Date;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);

MovieSchema.index({ title: 'text' });
