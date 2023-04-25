import { IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateDocumentDto {
  @IsString()
  readonly title: string;

  // 5 is the max length of the emoji icon
  @MaxLength(5, {
    message: 'Icon must be not more than 1 character',
  })
  @IsString()
  readonly icon: string;

  @IsString()
  readonly content: string;

  @IsNumber()
  readonly folderId: number;
}
