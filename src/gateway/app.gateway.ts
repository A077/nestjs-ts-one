import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server | undefined;

  handleConnection(client: any) {
    if (!this.server) return;
    this.server.emit('users', { message: 'A user connected', id: client.id });
  }

  handleDisconnect(client: any) {
    if (!this.server) return;
    this.server.emit('users', { message: 'A user disconnected', id: client.id });
  }

  @SubscribeMessage('ping')
  ping(@MessageBody() data: any) {
    return { event: 'pong', data };
  }
}
