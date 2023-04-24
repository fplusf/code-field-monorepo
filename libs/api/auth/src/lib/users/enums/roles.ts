export const RoleEnum = {
  Admin: 'admin',
  Regular: 'regular',
  Premium: 'premium',
} as const;

export type RoleType = (typeof RoleEnum)[keyof typeof RoleEnum];
