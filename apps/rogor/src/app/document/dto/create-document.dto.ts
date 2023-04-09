import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const DocumentSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1).max(255),
  icon: z.string().optional(),
  content: z.string(),
  folderId: z.number(),
  shareableLink: z.string().nullable().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export class CreateDocumentDto extends createZodDto(DocumentSchema) {}
