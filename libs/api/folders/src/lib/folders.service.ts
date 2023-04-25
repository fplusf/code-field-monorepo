import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Folder } from './entities/folder.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { HttpStatusCode } from 'axios';
import { MoveDocumentToFolderParams } from './folders.controller';
import { Document } from '@rogor/api/documents';
import { Events } from '@rogor/api/events';

@Injectable()
export class FoldersService {
  constructor(
    @InjectRepository(Folder) private folderRepository: Repository<Folder>,
    private queryRunner: EntityManager
  ) {}

  async findAll() {
    return this.folderRepository.find();
  }

  async findOne(id: number) {
    const folder = await this.folderRepository.findOne({
      where: { id },
      relations: ['documents'],
    });
    if (!folder) {
      throw new HttpException('Folder not found', HttpStatusCode.NotFound);
    }
    return folder;
  }

  async create(createFolderDto: CreateFolderDto) {
    const newFolder = this.folderRepository.create(createFolderDto);
    return this.folderRepository.save(newFolder);
  }

  async update(id: number, updateFolderDto: UpdateFolderDto) {
    const folderToUpdate = await this.folderRepository.preload({
      id,
      ...updateFolderDto,
    });

    if (!folderToUpdate) {
      throw new HttpException('Folder not found', HttpStatusCode.NotFound);
    }

    return this.folderRepository.save(folderToUpdate);
  }

  async remove(id: number) {
    const folder = await this.folderRepository.findOne({ where: { id } });
    return this.folderRepository.remove(folder);
  }

  async moveDocumentToFolder(params: MoveDocumentToFolderParams) {
    return this.queryRunner
      .transaction(async (manager) => {
        const document = await manager.findOne(Document, {
          where: { id: params.documentId },
        });
        const folder = await manager.findOne(Folder, {
          where: { id: params.folderId },
        });

        if (!document) {
          throw new HttpException(
            'Document not found',
            HttpStatusCode.NotFound
          );
        }

        if (!folder) {
          throw new HttpException('Folder not found', HttpStatusCode.NotFound);
        }

        const events = new Events();
        events.name = document.title;
        events.type = 'move';
        events.timestamp = new Date();
        events.payload = {
          documentId: document.id,
          folderId: folder.id,
        };

        document.folderId = folder.id;
        await manager.save(document);
        await manager.save(events);

        return events;
      })
      .catch((error) => {
        throw new HttpException(error.message, HttpStatusCode.BadRequest);
      });
  }
}
