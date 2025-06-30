import { ShowRepository } from '../../../repositories/show.repository';
import { UserRepository } from '../../../repositories/user.repository';

export class UpdateShow {
  private showRepository = new ShowRepository();
  private userRepository = new UserRepository();

  async execute(
    showId: string,
    userId: string,
    data: {
      title?: string;
      description?: string;
      startDate?: string;
      endDate?: string;
      status?: 'upcoming' | 'live' | 'ended';
    },
  ) {
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
      throw new Error('Vous ne pouvez modifier que vos propres spectacles');
    }

    const updateData: any = {};

    if (data.title !== undefined) {
      if (!data.title.trim()) {
        throw new Error('Le titre du spectacle est obligatoire');
      }
      updateData.title = data.title.trim();
    }

    if (data.description !== undefined) {
      updateData.description = data.description?.trim() || null;
    }

    if (data.startDate !== undefined) {
      const newStartDate = new Date(data.startDate);
      if (isNaN(newStartDate.getTime())) {
        throw new Error('Date de début invalide');
      }
      updateData.startDate = newStartDate;
    }

    if (data.endDate !== undefined) {
      const newEndDate = new Date(data.endDate);
      if (isNaN(newEndDate.getTime())) {
        throw new Error('Date de fin invalide');
      }
      updateData.endDate = newEndDate;
    }

    const finalStartDate = updateData.startDate || show.startDate;
    const finalEndDate = updateData.endDate || show.endDate;

    if (finalEndDate <= finalStartDate) {
      throw new Error('La date de fin doit être après la date de début');
    }

    if (data.status !== undefined) {
      if (show.status === 'ended' && data.status !== 'ended') {
        throw new Error('Un spectacle terminé ne peut pas changer de statut');
      }
      updateData.status = data.status;
    }

    const updatedShow = await this.showRepository.updateShow(
      showId,
      updateData,
    );

    return {
      id: updatedShow.id,
      title: updatedShow.title,
      description: updatedShow.description,
      startDate: updatedShow.startDate,
      endDate: updatedShow.endDate,
      status: updatedShow.status,
      updatedAt: updatedShow.updatedAt,
      message: 'Spectacle mis à jour avec succès',
    };
  }
}
