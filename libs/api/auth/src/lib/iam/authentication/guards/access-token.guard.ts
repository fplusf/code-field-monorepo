import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { Request } from 'express';
import { REQUEST_USER_KEY } from '../constants/iam';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      // TODO: Make this error to be returnen in the response
      throw new UnauthorizedException('No token provided');
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        this.jwtConfiguration
      );
      request[REQUEST_USER_KEY] = payload;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
    return true;
  }

  extractTokenFromHeader(request: Request) {
    const authorization = request.headers?.authorization;
    if (!authorization) {
      return null;
    }
    const [bearer, token] = authorization.split(' ');
    if (bearer !== 'Bearer' || !token) {
      return null;
    }
    return token;
  }
}
