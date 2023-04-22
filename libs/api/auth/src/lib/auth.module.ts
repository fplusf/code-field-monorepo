import { Module } from '@nestjs/common';
import { HashingService } from './iam/hashing/hashing.service';
import { BcryptService } from './iam/hashing/bcrypt.service';
import { AuthenticationService } from './iam/authentication/authentication.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { UsersController } from './users/users.controller';
import { AuthenticationController } from './iam/authentication/authentication.controller';
import { UsersService } from './users/users.service';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './iam/config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { AccessTokenGuard } from './iam/authentication/guards/access-token.guard';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationGuard } from './iam/authentication/guards/authentication.guard';
import { RefreshTokenIdsStorage } from './iam/authentication/refresh-token-ids.storage';
import { RedisModule } from '@rogor/api/redis';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    RedisModule,
  ],
  controllers: [UsersController, AuthenticationController],
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    RefreshTokenIdsStorage,
    AccessTokenGuard,
    AuthenticationService,
    UsersService,
  ],
})
export class AuthModule {}
