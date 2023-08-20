import {
  ConnectedSocket,
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { SocketDTO } from 'dtos';

import { Namespace, Socket } from 'socket.io';

@WebSocketGateway({
  namespace: 'game',
  cors: {
    origin: ['http://localhost:5173', 'https://gk.dinohan.dev'],
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Namespace;

  afterInit() {
    this.server.adapter.on('create-room', (room) => {
      console.log(`Created room ${room}`);
    });

    this.server.adapter.on('join-room', (room, id) => {
      console.log(`Client ${id} joined room ${room}`);
    });

    this.server.adapter.on('leave-room', (room, id) => {
      console.log(`Client ${id} left room ${room}`);
    });

    this.server.adapter.on('delete-room', (room) => {
      console.log(`Deleted room ${room}`);
    });
  }

  handleConnection(@ConnectedSocket() socket: Socket) {
    console.log(`${socket.id} 소켓 연결`);

    socket.join('room:lobby');
  }

  handleDisconnect(@ConnectedSocket() socket: Socket) {
    console.log(`${socket.id} 소켓 연결 해제 ❌`);

    socket.rooms.forEach((room) => {
      socket.leave(room);
    });
  }

  handleMessage(
    @ConnectedSocket() socket: Socket,
    payload: {
      message: string;
    },
  ) {
    console.log(`메세지 수신: ${payload.message}`);

    socket.broadcast.emit('message', payload);
  }

  @SubscribeMessage('join-game')
  handleJoinRoom(
    @ConnectedSocket() socket: Socket,
    @MessageBody()
    payload: SocketDTO['join-game'],
  ) {
    socket.join(payload.gameId);
  }
}
