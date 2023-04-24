import { Inject, Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { REDIS_OPTIONS, RedisModuleOptions } from './config/redis.config';

@Injectable()
export class RedisService {
  public redisClient: Redis;

  constructor(@Inject(REDIS_OPTIONS) private options: RedisModuleOptions) {}

  init() {
    console.log('RedisService.init()');
    this.redisClient = new Redis(this.options);
  }

  kill() {
    this.redisClient.quit();
  }
}
