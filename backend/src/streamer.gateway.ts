import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class StreamerGateway {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  sendUpdateToClients(update: any) {
    this.server.emit('update', update);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any) {
    console.log(`Received message from ${client}: ${payload}`);
  }
}
