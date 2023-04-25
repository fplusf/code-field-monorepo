import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { DocumentService } from './documents.service';
import { PaginationQueryDto } from '@rogor/api/common';

@Controller('documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.documentService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.documentService.findOne(id);
  }

  @Post()
  create(@Body() createDocumentDto: CreateDocumentDto) {
    return this.documentService.create(createDocumentDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateDocumentDto: UpdateDocumentDto
  ) {
    return this.documentService.update(id, updateDocumentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.documentService.remove(id);
  }
}
