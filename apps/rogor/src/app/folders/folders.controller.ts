import { Controller, Get } from '@nestjs/common';
import { FoldersService } from './folders.service';

@Controller('folders')
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

  @Get()
  getHello(): any {
    return { data: 'Hello World!' };
  }
}
