import { IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateSpaceDto {
  @IsNumber()
  userId: number;

  @IsString()
  spaceName: string;

  @IsUrl()
  avatar?: string;
}
