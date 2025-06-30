import http from 'http';

import { Server } from 'socket.io';

import env from '../config/env';

import { setupSocketEvent } from './events';

const { FRONTEND_URL } = env;

export function initializeSocketServer(server: http.Server): Server {
  const io = new Server(server, {
    cors: {
      origin: FRONTEND_URL,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      credentials: true,
    },
  });

  setupSocketEvent(io);

  console.log('🚀 Socket.IO server initialized with vote system');

  return io;
}
