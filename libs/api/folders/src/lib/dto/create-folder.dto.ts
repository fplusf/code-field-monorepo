import { IsHexColor, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateFolderDto {
  @IsString()
  name: string;

  @MaxLength(5)
  @IsString()
  icon: string;

  @IsHexColor()
  @IsString()
  color: string;

  @IsNumber()
  spaceId: number;
}
