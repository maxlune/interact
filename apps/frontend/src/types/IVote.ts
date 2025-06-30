import type { IAnswer } from './IAnswer.ts';
import type { IQuestion } from './IQuestion.ts';

export type VoteStatus = 'pending' | 'active' | 'closed';

export interface IVote {
  id: string;
  questionId: string;
  showId: string;
  createdBy: string;
  status: VoteStatus;
  startedAt?: string;
  closedAt?: string;
  createdAt: string;
  question: IQuestion;
  results?: IVoteResult[];
}

export interface IVoteResult {
  answerId: string;
  answer: IAnswer;
  voteCount: number;
  percentage: number;
}
