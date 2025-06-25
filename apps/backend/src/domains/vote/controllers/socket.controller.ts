import { Socket } from 'socket.io';

import { VoteUseCases } from '../use-cases/vote';

const voteUseCases = new VoteUseCases();

export const joinShow = async (
  socket: Socket,
  showId: string,
  // userId: string,
) => {
  try {
    const activeVotes = await voteUseCases.getActiveVotesByShow(showId);

    const roomName = `show:${showId}`;
    socket.join(roomName);

    socket.emit('activeVotes', activeVotes);

    socket.emit('vote:notification', {
      type: 'success',
      message: `Vous participez maintenant au spectacle ${showId}`,
    });

    console.info(`${socket.id} joined ${roomName}`);
  } catch (error) {
    console.error(error);
    socket.emit('error', 'Impossible de rejoindre le spectacle');
  }
};

export const leaveShow = async (
  socket: Socket,
  showId: string,
  // userId: string,
) => {
  try {
    const roomName = `show:${showId}`;
    socket.leave(roomName);

    socket.emit('vote:notification', {
      type: 'info',
      message: `Vous avez quitté le spectacle ${showId}`,
    });

    console.info(`${socket.id} left ${roomName}`);
  } catch (error) {
    console.error(error);
    socket.emit('error', 'Impossible de quitter le spectacle');
  }
};

export const participateVote = async (
  socket: Socket,
  data: { voteId: string; answerId: string; roomId: string },
  userId: string,
) => {
  try {
    const result = await voteUseCases.participateInVote({
      voteId: data.voteId,
      answerId: data.answerId,
      userId: userId,
    });

    if (!result.success) {
      throw new Error("Impossible d'enregistrer le vote");
    }

    socket.to(data.roomId).emit('voteUpdated', {
      voteId: data.voteId,
      message: 'Nouveaux votes enregistrés',
    });

    socket.emit('vote:notification', {
      type: 'success',
      message: 'Votre vote a été enregistré !',
    });
  } catch (error) {
    console.error(error);
    socket.emit('error', 'Impossible de participer au vote');
  }
};
