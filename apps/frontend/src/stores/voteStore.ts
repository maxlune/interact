import { create } from 'zustand/react';

import type { VoteStore } from '../types/IVoteStore.ts';

export const useVoteStore = create<VoteStore>((set, get) => ({
  activeVotes: [],
  results: {},
  userVotes: {},

  setActiveVotes: (votes) => set({ activeVotes: votes }),

  setResults: (voteId, results) => {
    set((state) => ({
      results: { ...state.results, [voteId]: results },
    }));
  },

  setUserVote: (voteId, answerId) =>
    set((state) => ({
      userVotes: { ...state.userVotes, [voteId]: answerId },
    })),

  hasVoted: (voteId) => {
    const { userVotes } = get();
    return voteId in userVotes;
  },
}));
