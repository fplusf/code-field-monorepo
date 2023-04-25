import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Events } from './entities/events.entity';
import { InjectRepository } from '@nestjs/typeorm';

export type EventsKeys = keyof Extract<Events, 'name' | 'type'>;
export type SearchTerm = Record<EventsKeys, string>;

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Events)
    private readonly eventsRepository: Repository<Events>
  ) {}

  findAll() {
    return this.eventsRepository.find();
  }

  search(searchTerm: SearchTerm) {
    // restrict the search to the name and type fields
    return this.eventsRepository.find({
      // select: ['name', 'type'],
      where: [{ ...searchTerm }],
    });
  }
}
