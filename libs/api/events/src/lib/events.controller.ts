import { Controller, Get, Query } from '@nestjs/common';
import { EventsService, SearchTerm } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Get('search')
  search(@Query() query: SearchTerm) {
    return this.eventsService.search(query);
  }
}
