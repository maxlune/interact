import { Server } from 'socket.io';

import {
  joinShow,
  leaveShow,
  participateVote,
} from '../domains/vote/controllers/socket.controller';
import { authenticateSocket } from '../utils/socketCookies';

export function setupSocketEvent(io: Server) {
  io.on('connection', (socket) => {
    const userId = authenticateSocket(socket);
    if (!userId) {
      return;
    }

    console.info(`${socket.id} connected`);

    socket.on('vote:join-show', (showId: string) => {
      joinShow(socket, showId);
    });

    socket.on('vote:leave-show', (showId: string) => {
      leaveShow(socket, showId);
    });

    socket.on(
      'vote:participate',
      (data: { voteId: string; answerId: string; showId: string }) => {
        participateVote(socket, io, data, userId);
      },
    );

    socket.on('disconnect', () => {
      console.info(`${socket.id} disconnected`);
    });
  });
}
