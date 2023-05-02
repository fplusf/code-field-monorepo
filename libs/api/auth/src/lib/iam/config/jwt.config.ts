import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  global: true,
  secret: process.env.JWT_SECRET,
  issuer: process.env.JWT_ISSUER,
  audience: process.env.JWT_AUDIENCE,
  accessExpiresIn: parseInt(process.env.JWT_EXPIRES_IN ?? '3600', 10),
  refreshExpiresIn: parseInt(process.env.JWT_REFRESH_EXPIRES_IN ?? '86400', 10),
}));
