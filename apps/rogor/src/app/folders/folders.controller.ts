import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { FoldersService } from './folders.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';

export type MoveDocumentToFolderParams = {
  documentId: number;
  folderId: number;
};

@Controller('folders')
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

  @Get()
  findAll() {
    return this.foldersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.foldersService.findOne(id);
  }

  @Post()
  create(@Body() createFolderDto: CreateFolderDto) {
    return this.foldersService.create(createFolderDto);
  }

  @Put('move/:documentId/:folderId')
  moveDocumentToFolder(@Param() params: MoveDocumentToFolderParams) {
    console.log('moveDocumentToFolder: ', params);
    return this.foldersService.moveDocumentToFolder(params);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateFolderDto: UpdateFolderDto) {
    return this.foldersService.update(id, updateFolderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.foldersService.remove(id);
  }
}
