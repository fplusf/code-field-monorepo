import { Module } from '@nestjs/common';
import { DocumentService } from './documents.service';
import { DocumentController } from './documents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from './entities/document.entity';
import { Events } from '@rogor/api/events';

@Module({
  imports: [TypeOrmModule.forFeature([Document, Events])],
  controllers: [DocumentController],
  providers: [DocumentService],
})
export class DocumentsModule {}
