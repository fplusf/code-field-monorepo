import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class SignInDto {
  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;
}
