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
      joinShow(socket, showId, userId);
    });

    socket.on('vote:leave-show', (showId: string) => {
      leaveShow(socket, showId, userId);
    });

    socket.on(
      'vote:participate',
      (data: { voteId: string; answerId: string; roomId: string }) => {
        participateVote(socket, data, userId);
      },
    );

    socket.on('disconnect', () => {
      console.info(`${socket.id} disconnected`);
    });
  });
}
