import { IsEnum, IsPhoneNumber, IsString, IsUrl } from 'class-validator';
import { DefaultPrivacyLevel } from '../entities/user.entity';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  email: string;

  @IsPhoneNumber()
  phoneNumber: string;

  @IsUrl()
  avatar: string;

  @IsEnum(DefaultPrivacyLevel)
  defaultPrivacyLevel: DefaultPrivacyLevel;
}
