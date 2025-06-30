import type { IVote, IVoteResult } from './IVote.ts';

export interface VoteStore {
  activeVotes: IVote[];
  results: Record<string, IVoteResult[]>;
  userVotes: Record<string, string>;

  setActiveVotes: (votes: IVote[]) => void;
  setResults: (voteId: string, results: IVoteResult[]) => void;
  setUserVote: (voteId: string, answerId: string) => void;
  hasVoted: (voteId: string) => boolean;
}
