import { Server, Socket } from 'socket.io';

import { GetActiveVotes } from '../use-cases/get-active-votes';
import { GetVoteResults } from '../use-cases/get-vote-results';
import { ParticipateVote } from '../use-cases/participate-vote';

const participateVoteUseCase = new ParticipateVote();
const getActiveVotesUseCase = new GetActiveVotes();
const getVoteResultsUseCase = new GetVoteResults();

export const joinShow = async (
  socket: Socket,
  showId: string,
  // userId: string,
) => {
  try {
    const roomName = `show:${showId}`;
    socket.join(roomName);

    const activeVotes = await getActiveVotesUseCase.execute(showId);

    socket.emit('vote:activeVotes', activeVotes);

    for (const vote of activeVotes) {
      try {
        const results = await getVoteResultsUseCase.execute(vote.id);
        socket.emit('vote:resultsUpdated', {
          voteId: vote.id,
          results: results,
        });
      } catch (error) {
        console.log(`Pas de résultats pour vote ${vote.id}:`, error);
      }
    }

    socket.emit('vote:joinedShow', {
      showId,
      message: `Connecté au spectacle ${showId}`,
    });

    console.info(`${socket.id} joined ${roomName}`);
  } catch (error) {
    console.error(error);
    socket.emit('vote:error', 'Impossible de rejoindre le spectacle');
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

    socket.emit('vote:leftShow', {
      showId,
      message: `Déconnecté du spectacle ${showId}`,
    });

    console.info(`${socket.id} left ${roomName}`);
  } catch (error) {
    console.error(error);
    socket.emit('vote:error', 'Impossible de quitter le spectacle');
  }
};

export const participateVote = async (
  socket: Socket,
  io: Server,
  data: { voteId: string; answerId: string; showId: string },
  userId: string,
) => {
  try {
    await participateVoteUseCase.execute({
      voteId: data.voteId,
      answerId: data.answerId,
      userId: userId,
    });

    const results = await getVoteResultsUseCase.execute(data.voteId);

    const roomName = `show:${data.showId}`;
    io.to(roomName).emit('vote:resultsUpdated', {
      voteId: data.voteId,
      results: results,
    });

    socket.emit('vote:voteConfirmed', {
      message: 'Votre vote a été enregistré !',
    });
  } catch (error) {
    console.error(error);
    socket.emit(
      'vote:error',
      error instanceof Error ? error.message : 'Impossible de voter',
    );
  }
};

export const broadcastVoteStarted = (
  io: Server,
  showId: string,
  voteData: any,
) => {
  const roomName = `show:${showId}`;
  io.to(roomName).emit('vote:started', voteData);
};

export const broadcastVoteClosed = (
  io: Server,
  showId: string,
  voteId: string,
  finalResults: any,
) => {
  const roomName = `show:${showId}`;
  io.to(roomName).emit('vote:closed', {
    voteId,
    finalResults,
  });
};
