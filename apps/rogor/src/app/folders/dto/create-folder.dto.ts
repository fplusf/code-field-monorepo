import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const FolderSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  icon: z.string(),
  color: z.string(),
  spaceId: z.number(),
  deepLink: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export class CreateFolderDto extends createZodDto(FolderSchema) {}
