import { ShowRepository } from '../../../repositories/show.repository';

export class GetShows {
  private showRepository = new ShowRepository();

  async execute() {
    const shows = await this.showRepository.getAllShows();

    return shows.map((show) => ({
      id: show.id,
      title: show.title,
      description: show.description,
      startDate: show.startDate,
      endDate: show.endDate,
      status: show.status,
      creator: {
        id: show.creator.id,
        username: show.creator.username,
        role: show.creator.role,
      },
      // Stats rapides
      totalVotes: show.votes?.length || 0,
      activeVotes: show.votes?.filter((v) => v.status === 'active').length || 0,
      createdAt: show.createdAt,
    }));
  }
}
