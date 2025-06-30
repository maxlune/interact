import { useEffect, useRef } from 'react';

import { socketService } from '../sockets/socketService.ts';
import { useVoteStore } from '../stores/voteStore.ts';

export const useVote = (showId: string) => {
  const store = useVoteStore();
  const connectedShowRef = useRef<string | null>(null);

  useEffect(() => {
    if (connectedShowRef.current === showId) {
      // return;
      return () => {};
    }

    connectedShowRef.current = showId;

    socketService.joinShow(showId);

    const cleanupActiveVotes = socketService.onActiveVotes((votes) => {
      store.setActiveVotes(votes);
    });

    const cleanupResults = socketService.onResultsUpdated(
      ({ voteId, results }) => {
        store.setResults(voteId, results);
      },
    );

    return () => {
      connectedShowRef.current = null;
      cleanupActiveVotes();
      cleanupResults();
    };
  }, [showId]);

  return {
    ...store,
    vote: (voteId: string, answerId: string) => {
      if (store.hasVoted(voteId)) {
        return false;
      }

      socketService.vote(voteId, answerId, showId);
      store.setUserVote(voteId, answerId);
      return true;
    },
    isConnected: socketService.isConnected(),
  };
};
