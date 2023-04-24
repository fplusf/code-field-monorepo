import { RoleType } from '../../users/enums/roles';

export interface ActiveUserData {
  /**
   * The user's unique identifier.
   */
  sub: number;

  /**
   * The user's email address.
   */
  email: string;

  roles: RoleType[];
}
