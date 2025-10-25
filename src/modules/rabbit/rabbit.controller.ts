import { Body, Controller, Post } from '@nestjs/common';
import { RabbitService } from './rabbit.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('rabbit')
@Controller('rabbit')
export class RabbitController {
  constructor(private readonly rabbit: RabbitService) {}

  @Post('publish')
  publish(@Body() body: { routingKey: string; payload: any }) {
    const { routingKey, payload } = body;
    return this.rabbit.publishDemo(routingKey || 'demo.event', payload || { hello: 'world' });
  }
}
