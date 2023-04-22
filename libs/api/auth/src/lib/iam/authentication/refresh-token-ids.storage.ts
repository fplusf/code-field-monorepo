import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { InvalidatedRefreshTokenError } from './errors/invalidated-refresh-token';
import { RedisService } from '@rogor/api/redis';

@Injectable()
export class RefreshTokenIdsStorage
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  constructor(private redisService: RedisService) {}

  onApplicationBootstrap() {
    this.redisService.init();
  }

  onApplicationShutdown() {
    this.redisService.kill();
  }

  async insert(userId: number, tokenId: string) {
    return await this.redisService.redisClient.set(
      this.getKey(userId),
      tokenId
    );
  }

  async validate(userId: number, tokenId: string) {
    const storedId = await this.redisService.redisClient.get(
      this.getKey(userId)
    );

    if (storedId !== tokenId) {
      throw new InvalidatedRefreshTokenError();
    }
    return storedId === tokenId;
  }

  async invalidate(userId: number) {
    return await this.redisService.redisClient.del(this.getKey(userId));
  }

  getKey(userId: number) {
    return `user-${userId}`;
  }
}
