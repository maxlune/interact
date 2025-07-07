import { io, Socket } from 'socket.io-client';

import type { IVote, IVoteResult } from '../types/IVote.ts';

class SocketService {
  private socket: Socket | null = null;
  private connectedShows = new Set<string>();

  constructor() {
    this.connect();
  }

  connect() {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';

    this.socket = io(apiUrl, {
      withCredentials: true,
    });
  }

  joinShow(showId: string) {
    if (this.connectedShows.has(showId)) {
      return;
    }

    this.connectedShows.add(showId);
    this.socket?.emit('vote:join-show', showId);
  }

  vote(voteId: string, answerId: string, showId: string) {
    this.socket?.emit('vote:participate', { voteId, answerId, showId });
  }

  activeVotes(callback: (votes: IVote[]) => void) {
    this.socket?.on('vote:activeVotes', callback);
    return () => this.socket?.off('vote:activeVotes', callback);
  }

  resultsUpdated(
    callback: (data: { voteId: string; results: IVoteResult[] }) => void,
  ) {
    this.socket?.on('vote:resultsUpdated', (data) => {
      let actualResults = data.results;

      if (
        data.results &&
        typeof data.results === 'object' &&
        !Array.isArray(data.results)
      ) {
        if ('results' in data.results) {
          actualResults = data.results.results;
        }
      }

      callback({
        voteId: data.voteId,
        results: actualResults,
      });
    });

    return () => this.socket?.off('vote:resultsUpdated');
  }

  isConnected() {
    return this.socket?.connected || false;
  }
}

export const socketService = new SocketService();
