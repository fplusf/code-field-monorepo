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

  async canActivate(context: ExecutionContext) {
    const authTypes = this.reflector.getAllAndOverride<AuthType[]>(
      AUTH_TYPE_KEY,
      [context.getHandler(), context.getClass()]
    ) ?? [AuthenticationGuard.defaultAuthType];

    const guards = authTypes.map((type) => this.authTypeGuardMap[type]).flat();
    const error = new UnauthorizedException();

    for (const guard of guards) {
      const canActivate = await Promise.resolve(
        guard.canActivate(context)
      ).catch((e) => e);
      if (canActivate === true) {
        return true;
      }
    }

    throw error;
  }
}
