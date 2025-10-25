import { DynamicModule, Global, Module } from '@nestjs/common';
import Redis, { RedisOptions } from 'ioredis';

export const REDIS_CLIENT = Symbol('REDIS_CLIENT');

@Global()
@Module({})
export class RedisModule {
  static forRoot(options?: RedisOptions): DynamicModule {
    const enabled = process.env.REDIS_ENABLED === 'true';
    const provider = {
      provide: REDIS_CLIENT,
      useFactory: () => {
        if (!enabled) return null;
        const url = process.env.REDIS_URL || 'redis://localhost:6379';
        return new Redis(url, options || {});
      },
    };
    return {
      module: RedisModule,
      providers: [provider],
      exports: [provider],
    };
  }
}
