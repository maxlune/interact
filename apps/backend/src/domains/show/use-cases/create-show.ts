import { ShowRepository } from '../../../repositories/show.repository';

export class CreateShow {
  private showRepository = new ShowRepository();

  async execute(data: {
    title: string;
    description?: string;
    startDate: string;
    endDate: string;
    createdBy: string;
  }) {
    if (!data.title?.trim()) {
      throw new Error('Le titre du spectacle est obligatoire');
    }

    if (data.title.length > 100) {
      throw new Error(
        'Le titre du spectacle ne peut pas dépasser 100 caractères',
      );
    }

    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);

    if (isNaN(startDate.getTime())) {
      throw new Error('Date de début invalide');
    }

    if (isNaN(endDate.getTime())) {
      throw new Error('Date de fin invalide');
    }

    const now = new Date();
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);

    if (startDate < fiveMinutesAgo) {
      throw new Error('La date de début ne peut pas être dans le passé');
    }

    if (endDate <= startDate) {
      throw new Error('La date de fin doit être après la date de début');
    }

    const show = await this.showRepository.createShow({
      title: data.title.trim(),
      description: data.description?.trim(),
      startDate,
      endDate,
      createdBy: data.createdBy,
    });

    return {
      id: show.id,
      title: show.title,
      description: show.description,
      startDate: show.startDate,
      endDate: show.endDate,
      status: show.status,
      createdAt: show.createdAt,
      message: 'Spectacle créé avec succès',
    };
  }
}
