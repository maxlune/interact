import { ResultRepository } from '../../../repositories/result.repository';
import { VoteRepository } from '../../../repositories/vote.repository';

export class ParticipateVote {
  private voteRepository = new VoteRepository();
  private resultRepository = new ResultRepository();

  async execute(data: { voteId: string; answerId: string; userId?: string }) {
    const vote = await this.voteRepository.getVoteById(data.voteId);

    if (!vote) {
      throw new Error('Vote introuvable');
    }

    if (vote.status !== 'active') {
      throw new Error("Ce vote n'est pas actif");
    }

    const isValidAnswer = vote.question?.answers?.some(
      (answer) => answer.id === data.answerId,
    );

    if (!isValidAnswer) {
      throw new Error('Réponse invalide pour cette question');
    }

    const result = await this.resultRepository.createResult({
      voteId: data.voteId,
      answerId: data.answerId,
      userId: data.userId,
    });

    return {
      success: true,
      result,
      message: 'Vote enregistré avec succès',
    };
  }
}
