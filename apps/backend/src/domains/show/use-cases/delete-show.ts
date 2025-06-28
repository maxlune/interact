import { ShowRepository } from '../../../repositories/show.repository';
import { UserRepository } from '../../../repositories/user.repository';

export class DeleteShow {
  private showRepository = new ShowRepository();
  private userRepository = new UserRepository();

  async execute(showId: string, userId: string) {
    const show = await this.showRepository.getShowById(showId);
    if (!show) {
      throw new Error('Spectacle introuvable');
    }

    const user = await this.userRepository.getUserById(userId, {
      id: true,
      role: true,
    });

    if (!user) {
      throw new Error('Utilisateur introuvable');
    }

    if (show.createdBy !== userId && user.role !== 'admin') {
      throw new Error('Vous ne pouvez supprimer que vos propres spectacles');
    }

    const hasActiveVotes = show.votes?.some((vote) => vote.status === 'active');
    if (hasActiveVotes) {
      throw new Error(
        'Impossible de supprimer un spectacle avec des votes actifs',
      );
    }

    await this.showRepository.deleteShow(showId);

    return {
      message: 'Spectacle supprimé avec succès',
    };
  }
}
