export const RoleEnum = {
  Admin: 'admin',
  Regular: 'regular',
} as const;

export type RoleType = (typeof RoleEnum)[keyof typeof RoleEnum];
