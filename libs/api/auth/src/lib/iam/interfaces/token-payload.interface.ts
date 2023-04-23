import { RoleType } from '../../users/enums/roles';

export interface TokenPayload {
  username?: string;
  email?: string;
  refreshTokenId?: string;
  roles?: RoleType[];
}
