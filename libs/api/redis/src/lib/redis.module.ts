import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { REDIS_OPTIONS } from './config/redis.config';

@Module({
  providers: [
    RedisService,
    {
      provide: REDIS_OPTIONS,
      useValue: { host: process.env.REDIS_HOST, port: 6379 },
    },
  ],
  exports: [RedisService],
})
export class RedisModule {}
