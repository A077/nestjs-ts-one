import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthModule } from './health/health.module';
import { MongoExampleModule } from './mongo-example/mongo-example.module';
import { PgExampleModule } from './pg-example/pg-example.module';
import { RabbitModule } from './rabbit/rabbit.module';
import { RedisModule } from './redis/redis.module';
import { AppGateway } from 'gateway/app.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env', '.env.local'] }),
    // MongoDB
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGO_URI || 'mongodb://localhost:27017/nest',
      }),
    }),
    // PostgreSQL
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        url: process.env.PG_URL || 'postgres://postgres:postgres@localhost:5432/nest',
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    HealthModule,
    MongoExampleModule,
    PgExampleModule,
    RabbitModule,
    RedisModule.forRoot(),
  ],
  providers: [AppGateway],
})
export class AppModule {}
