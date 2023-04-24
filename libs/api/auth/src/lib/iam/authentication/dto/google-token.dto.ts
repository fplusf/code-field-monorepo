import { IsNotEmpty, IsString } from 'class-validator';

export class GoogleTokenDto {
  @IsString()
  @IsNotEmpty()
  idToken: string;
}
