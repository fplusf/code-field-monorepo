import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';
import { DefaultPrivacyLevel } from '../entities/user.entity';
import { v4 } from 'uuid';

const UserSchema = z.object({
  id: z.number().optional(),
  uuid: z.string().optional().default(v4()),
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  password: z.string(),
  email: z.string(),
  phoneNumber: z.string().optional(),
  avatar: z.string().nullable().optional(),
  defaultPrivacyLevel: z
    .nativeEnum(DefaultPrivacyLevel)
    .optional()
    .default(DefaultPrivacyLevel.PRIVATE),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export class CreateUserDto extends createZodDto(UserSchema) {}
