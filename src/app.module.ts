import { Module } from '@nestjs/common';
import { MovieModule } from './movies/movie.module';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from './utils/roles.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const username = configService.get('MONGO_USERNAME');
        const password = configService.get('MONGO_PASSWORD');
        const database = configService.get('MONGO_DATABASE');
        const host = configService.get('MONGO_HOST');
        const localurl = configService.get('MONGODB_LOCAL_URL');

        let uri: string;
        if (username && password) {
          uri = `mongodb://${username}:${password}@${host}/${database}`;
        } else {
          uri = localurl;
        }

        return {
          uri: `${localurl}`,
        };
      },
      inject: [ConfigService],
    }),
    MovieModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
