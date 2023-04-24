import { IsEnum, IsPhoneNumber, IsString, IsUrl } from 'class-validator';
import { DefaultPrivacyLevel } from '../entities/user.entity';
import { RoleEnum, RoleType } from '../enums/roles';

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

  @IsEnum(RoleEnum)
  roles: RoleType[];

  @IsEnum(DefaultPrivacyLevel)
  defaultPrivacyLevel: DefaultPrivacyLevel;
}
