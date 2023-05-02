import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@rogor/api/auth';
import { DocumentsModule } from '@rogor/api/documents';
import { SpacesModule } from '@rogor/api/spaces';
import { FoldersModule } from '@rogor/api/folders';
import { EventsModule } from '@rogor/api/events';
import { ConfigModule } from '@nestjs/config';
import { z } from 'zod';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('../ormconfig');

// TODO: make sure validation works
const envSchema = z.object({
  DB_HOST: z.string(),
  DB_PORT: z.number().default(5432),
});

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: {
        validate: () => envSchema.safeParse,
      },
    }),
    TypeOrmModule.forRoot(config),
    AuthModule,
    SpacesModule,
    FoldersModule,
    DocumentsModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
