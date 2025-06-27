import { VoteRepository } from '../../../repositories/vote.repository';

export class GetActiveVotes {
  private voteRepository = new VoteRepository();

  async execute(showId: string) {
    const activeVotes = await this.voteRepository.getActiveVotesByShow(showId);

    return activeVotes.map((vote) => ({
      id: vote.id,
      status: vote.status,
      startedAt: vote.startedAt,
      question: {
        id: vote.question?.id,
        content: vote.question?.content,
        answers: vote.question?.answers?.map((answer) => ({
          id: answer.id,
          content: answer.content,
        })),
      },
    }));
  }
}
