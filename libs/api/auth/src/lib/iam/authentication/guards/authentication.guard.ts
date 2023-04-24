import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AccessTokenGuard } from './access-token.guard';
import { Reflector } from '@nestjs/core';
import { AuthType } from '../enums/auth-type.enum';
import { AUTH_TYPE_KEY } from '../decorators/auth.decorator';

@Injectable()
export class AuthenticationGuard {
  private static readonly defaultAuthType = AuthType.Bearer;
  private readonly authTypeGuardMap: Record<
    AuthType,
    CanActivate | CanActivate[]
  > = {
    [AuthType.Bearer]: this.accessTokenGuard,
    [AuthType.None]: { canActivate: () => true },
  };

  constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard
  ) {}

  canActivate(context: ExecutionContext) {
    const authTypes = this.reflector.getAllAndOverride<AuthType[]>(
      AUTH_TYPE_KEY,
      [context.getHandler(), context.getClass()]
    ) ?? [AuthenticationGuard.defaultAuthType];

    const guards = authTypes.flatMap(
      (authType) => this.authTypeGuardMap[authType]
    );
    let error = new UnauthorizedException();

    return guards.every(async (guard) => {
      const canActivate = await Promise.resolve(
        guard.canActivate(context)
      ).catch((err) => {
        error = err;
      });

      if (!canActivate) {
        throw error;
      }
      return canActivate;
    });
  }
}
