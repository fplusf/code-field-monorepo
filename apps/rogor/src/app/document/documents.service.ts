import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './entities/document.entity';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document) private documentRepository: Repository<Document>
  ) {}

  async findAll() {
    return this.documentRepository.find();
  }

  async findOne(id: number) {
    const folder = await this.documentRepository.findOne({ where: { id } });
    if (!folder) {
      throw new Error('Folder not found');
    }
    return folder;
  }

  async create(createFolderDto: CreateDocumentDto) {
    const newFolder = this.documentRepository.create(createFolderDto);
    return this.documentRepository.save(newFolder);
  }

  async update(id: number, updateFolderDto: UpdateDocumentDto) {
    const folderToUpdate = await this.documentRepository.preload({
      id,
      ...updateFolderDto,
    });

    if (!folderToUpdate) {
      throw new Error('Folder not found');
    }

    return this.documentRepository.save(folderToUpdate);
  }

  async remove(id: number) {
    const folder = await this.documentRepository.findOne({ where: { id } });
    return this.documentRepository.remove(folder);
  }
}
