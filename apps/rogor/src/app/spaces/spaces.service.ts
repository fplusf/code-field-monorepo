import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSpaceDto } from './dto/create-space.dto';
import { UpdateSpaceDto } from './dto/update-space.dto';
import { Space } from './entities/space.entity';
import { HttpStatusCode } from 'axios';

@Injectable()
export class SpacesService {
  constructor(
    @InjectRepository(Space)
    private readonly spaceRepository: Repository<Space>
  ) {}

  findAll() {
    return this.spaceRepository.find({
      // include the relations here so that the folders are included in the response
      relations: ['folders'],
    });
  }

  async findOne(id: number) {
    const space = await this.spaceRepository.findOne({
      where: { id },
      relations: ['folders'],
    });
    if (!space) {
      throw new HttpException('Space not found', HttpStatusCode.NotFound);
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
      throw new HttpException('Space not found', HttpStatusCode.NotFound);
    }

    return this.spaceRepository.save(spaceToUpdate);
  }

  async remove(id: number) {
    const space = await this.spaceRepository.findOne({ where: { id } });
    return this.spaceRepository.remove(space);
  }
}
