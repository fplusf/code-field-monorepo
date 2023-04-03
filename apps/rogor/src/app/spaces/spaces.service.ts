import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSpaceDto } from './dto/create-space.dto';
import { UpdateSpaceDto } from './dto/update-space.dto';
import { Space } from './entities/space.entity';

@Injectable()
export class SpacesService {
  constructor(
    @InjectRepository(Space)
    private readonly spaceRepository: Repository<Space>
  ) {}

  findAll() {
    return this.spaceRepository.find();
  }

  async findOne(id: number) {
    const space = await this.spaceRepository.findOne({ where: { id } });
    if (!space) {
      throw new Error('Space not found');
    }
    return space;
  }

  create(createSpaceDto: CreateSpaceDto) {
    const space = this.spaceRepository.create(createSpaceDto);
    return this.spaceRepository.save(space);
  }

  async update(id: number, updateSpaceDto: UpdateSpaceDto) {
    const spaceToUpdate = await this.spaceRepository.preload({
      id,
      ...updateSpaceDto,
    });

    if (!spaceToUpdate) {
      throw new Error('Space not found');
    }

    return this.spaceRepository.save(spaceToUpdate);
  }

  async remove(id: number) {
    const space = await this.spaceRepository.findOne({ where: { id } });
    return this.spaceRepository.remove(space);
  }
}
