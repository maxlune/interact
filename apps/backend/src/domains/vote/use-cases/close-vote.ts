import { ResultRepository } from '../../../repositories/result.repository';
import { UserRepository } from '../../../repositories/user.repository';
import { VoteRepository } from '../../../repositories/vote.repository';

export class CloseVote {
  private voteRepository = new VoteRepository();
  private userRepository = new UserRepository();
  private resultRepository = new ResultRepository();

  async execute(voteId: string, userId: string) {
    const user = await this.userRepository.getUserById(userId, {
      id: true,
      role: true,
    });

    if (!user || !['admin', 'actor'].includes(user.role!)) {
      throw new Error('Permissions insuffisantes pour fermer un vote');
    }

    const vote = await this.voteRepository.getVoteById(voteId);

    if (!vote) {
      throw new Error('Vote introuvable');
    }

    if (vote.status !== 'active') {
      throw new Error(`Impossible de fermer ce vote (statut: ${vote.status})`);
    }

    if (vote.createdBy !== userId && user.role !== 'admin') {
      throw new Error('Vous ne pouvez fermer que vos propres votes');
    }

    const updatedVote = await this.voteRepository.closeVote(voteId);

    const finalResults =
      await this.resultRepository.getVoteResultsWithSQL(voteId);

    return {
      id: updatedVote.id,
      status: updatedVote.status,
      closedAt: updatedVote.closedAt,
      showId: updatedVote.showId,
      question: vote.question,
      finalResults: {
        totalVotes: finalResults.totalVotes,
        results: finalResults.results,
      },
      message: 'Vote fermé avec succès',
    };
  }
}
