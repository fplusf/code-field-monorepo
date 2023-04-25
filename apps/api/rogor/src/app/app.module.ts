import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@rogor/api/auth';
import { DocumentsModule } from '@rogor/api/documents';
import { SpacesModule } from '@rogor/api/spaces';
import { FoldersModule } from '@rogor/api/folders';
import { EventsModule } from '@rogor/api/events';
import { config } from 'process';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...config,
      autoLoadEntities: true,
      synchronize: true,
    }),
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
