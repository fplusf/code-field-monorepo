import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Folder } from './entities/folder.entity';
import { Repository } from 'typeorm';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { HttpStatusCode } from 'axios';

@Injectable()
export class FoldersService {
  constructor(
    @InjectRepository(Folder) private folderRepository: Repository<Folder>
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
}
