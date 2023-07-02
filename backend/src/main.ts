import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for HTTP requests
  app.use(cors());

  // Enable WebSocket server
  const server = app.getHttpServer();
  const io = require('socket.io')(server, {
    cors: {
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type'],
    },
  });

  app.useWebSocketAdapter(new IoAdapter(io));

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
  console.log('Application is running on port 3000');
}

bootstrap();
