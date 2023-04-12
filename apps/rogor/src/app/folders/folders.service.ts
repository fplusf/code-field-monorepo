import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Folder } from './entities/folder.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { HttpStatusCode } from 'axios';
import { Document } from '../document/entities/document.entity';
import { MoveDocumentToFolderParams } from './folders.controller';

@Injectable()
export class FoldersService {
  constructor(
    @InjectRepository(Folder) private folderRepository: Repository<Folder>,
    private manager: EntityManager
  ) {}

  async findAll() {
    return this.folderRepository.find();
  }

  async findOne(id: number) {
    const folder = await this.folderRepository.findOne({ where: { id } });
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

  // TODO: this is not working yet
  // Use transaction to move document to folder & create event in one transaction
  async moveDocumentToFolder(
    params: MoveDocumentToFolderParams
  ): Promise<Document> {
    const folder = await this.manager.findOne(Folder, {
      where: { id: +params.folderId },
    });
    if (!folder) {
      throw new HttpException('Folder not found', HttpStatusCode.NotFound);
    }

    const document = await this.manager.findOne(Document, {
      where: { id: +params.documentId },
    });
    if (!document) {
      throw new HttpException('Document not found', HttpStatusCode.NotFound);
    }

    document.folderId = +params.folderId;
    return this.manager.save(Document, document);
  }
}
