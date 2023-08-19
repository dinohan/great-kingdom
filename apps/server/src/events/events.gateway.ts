import {
  ConnectedSocket,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Namespace, Socket } from 'socket.io';

@WebSocketGateway({
  namespace: 'game',
  cors: {
    origin: '*',
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

    socket.broadcast.emit('message', {
      message: `${socket.id}가 들어왔습니다.`,
    });
  }

  handleDisconnect(@ConnectedSocket() socket: Socket) {
    console.log(`${socket.id} 소켓 연결 해제 ❌`);
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
}
