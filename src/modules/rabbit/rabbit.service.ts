import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitService implements OnModuleInit, OnModuleDestroy {
  private connection: any;
  private channel: amqp.Channel | undefined;
  private readonly logger = new Logger(RabbitService.name);
  private readonly uri = process.env.RABBITMQ_URI || 'amqp://guest:guest@localhost:5672';
  private readonly exchange = 'test.exchange';

  async onModuleInit() {
    try {
      this.connection = await amqp.connect(this.uri);
      this.channel = await this.connection.createChannel();

      this.logger.log('RabbitMQ connection established');
    } catch (error) {
      this.logger.error('Failed to connect to RabbitMQ', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    try {
      await this.channel?.close();
      await this.connection?.close();
      this.logger.log('RabbitMQ connection closed');
    } catch (error) {
      this.logger.error('Error closing RabbitMQ connection', error);
    }
  }

  async publishDemo(routingKey: string, payload: any) {
    if (!this.channel) {
      throw new Error('RabbitMQ channel is not initialized');
    }

    try {
      const message = Buffer.from(JSON.stringify(payload));
      const published = this.channel.publish(
        this.exchange,
        routingKey,
        message,
        {
          persistent: true,
          contentType: 'application/json',
        }
      );

      if (!published) {
        this.logger.warn('Message not published, channel buffer full');
      }

      return {
        success: true,
        exchange: this.exchange,
        routingKey,
        payload,
      };
    } catch (error) {
      this.logger.error('Failed to publish message', error);
      throw error;
    }
  }
}
