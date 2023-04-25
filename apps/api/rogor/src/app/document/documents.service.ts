import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './entities/document.entity';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { HttpStatusCode } from 'axios';
import { PaginationQueryDto } from '../../../../../../libs/api/common/dto/pagination-query.dto';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private documentRepository: Repository<Document>
  ) {}

  async findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset, order, sortBy } = paginationQuery;

    return this.documentRepository.find({
      take: limit,
      skip: offset,
      order: {
        [sortBy]: order,
      },
    });
  }

  async findOne(id: number) {
    const folder = await this.documentRepository.findOne({ where: { id } });
    if (!folder) {
      throw new HttpException('Document not found', HttpStatusCode.NotFound);
    }

    // update lastViewedAt
    const recentDocument = await this.documentRepository.findOne({
      where: { id },
    });
    if (recentDocument) {
      recentDocument.lastViewedAt = new Date();
      await this.documentRepository.save(recentDocument);
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
      throw new HttpException('Document not found', HttpStatusCode.NotFound);
    }

    return this.documentRepository.save(folderToUpdate);
  }

  async remove(id: number) {
    const folder = await this.documentRepository.findOne({ where: { id } });
    return this.documentRepository.remove(folder);
  }
}
