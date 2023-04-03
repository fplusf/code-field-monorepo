import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const SpaceSchema = z.object({
  id: z.number().optional(),
  userId: z.number(),
  spaceName: z.string(),
  avatar: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export class CreateSpaceDto extends createZodDto(SpaceSchema) {}
