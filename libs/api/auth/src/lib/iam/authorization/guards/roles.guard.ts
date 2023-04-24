import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { RoleType } from '../../../users/enums/roles';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { ActiveUserData } from '../../interfaces/active-user.interface';
import { REQUEST_USER_KEY } from '../../authentication/constants/iam';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const contextRoles = this.reflector.getAllAndOverride<RoleType[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    );

    if (!contextRoles) {
      return true;
    }

    const user: ActiveUserData = context.switchToHttp().getRequest()[
      REQUEST_USER_KEY
    ];

    console.log('user', user);

    return contextRoles.some((role) => user.roles.includes(role));
  }
}
