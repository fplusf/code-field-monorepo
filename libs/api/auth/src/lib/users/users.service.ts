import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { HttpStatusCode } from 'axios';
import { PaginationQueryDto } from '@rogor/api/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  findAll(paginationQueryDto: PaginationQueryDto) {
    const { limit, offset } = paginationQueryDto;
    console.log('limit', limit);
    console.log('offset', offset);
    return this.userRepository.find({
      // relations: ['spaces'],
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      // relations: ['spaces'],
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatusCode.NotFound);
    }
    return user;
  }

  create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({
      id,
      ...updateUserDto,
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatusCode.NotFound);
    }

    return this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    return this.userRepository.remove(user);
  }
}
