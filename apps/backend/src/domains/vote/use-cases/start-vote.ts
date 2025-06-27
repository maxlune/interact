import { UserRepository } from '../../../repositories/user.repository';
import { VoteRepository } from '../../../repositories/vote.repository';

export class StartVote {
  private voteRepository = new VoteRepository();
  private userRepository = new UserRepository();

  async execute(voteId: string, userId: string) {
    const user = await this.userRepository.getUserById(userId, {
      id: true,
      role: true,
    });

    if (!user || !['admin', 'actor'].includes(user.role!)) {
      throw new Error('Permissions insuffisantes pour démarrer un vote');
    }

    const vote = await this.voteRepository.getVoteById(voteId);

    if (!vote) {
      throw new Error('Vote introuvable');
    }

    if (vote.status !== 'pending') {
      throw new Error(
        `Impossible de démarrer ce vote (statut: ${vote.status})`,
      );
    }

    if (vote.createdBy !== userId && user.role !== 'admin') {
      throw new Error('Vous ne pouvez démarrer que vos propres votes');
    }

    const updatedVote = await this.voteRepository.startVote(voteId);

    return {
      id: updatedVote.id,
      status: updatedVote.status,
      startedAt: updatedVote.startedAt,
      showId: updatedVote.showId,
      question: vote.question,
      message: 'Vote démarré avec succès',
    };
  }
}
