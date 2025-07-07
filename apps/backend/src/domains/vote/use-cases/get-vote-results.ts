import { ResultRepository } from '../../../repositories/result.repository';
import { VoteRepository } from '../../../repositories/vote.repository';

export class GetVoteResults {
  private voteRepository = new VoteRepository();
  private resultRepository = new ResultRepository();

  async execute(voteId: string) {
    const vote = await this.voteRepository.getVoteById(voteId);

    if (!vote) {
      throw new Error('Vote introuvable');
    }

    const results = await this.resultRepository.getVoteResults(voteId);

    return {
      voteId: vote.id,
      question: vote.question?.content,
      status: vote.status,
      totalVotes: results.totalVotes,
      results: results.results.map((result) => ({
        answerId: result.answerId,
        answerContent: result.answerContent,
        voteCount: result.voteCount,
        percentage: result.percentage,
      })),
      startedAt: vote.startedAt,
      closedAt: vote.closedAt,
    };
  }
}
