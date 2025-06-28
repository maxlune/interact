import { ShowRepository } from '../../../repositories/show.repository';

export class GetMyShows {
  private showRepository = new ShowRepository();

  async execute(userId: string) {
    const myShows = await this.showRepository.getShowsByCreator(userId);

    return myShows.map((show) => ({
      id: show.id,
      title: show.title,
      description: show.description,
      startDate: show.startDate,
      endDate: show.endDate,
      status: show.status,
      totalVotes: show.votes?.length || 0,
      activeVotes: show.votes?.filter((v) => v.status === 'active').length || 0,
      pendingVotes:
        show.votes?.filter((v) => v.status === 'pending').length || 0,
      closedVotes: show.votes?.filter((v) => v.status === 'closed').length || 0,
      createdAt: show.createdAt,
      updatedAt: show.updatedAt,
    }));
  }
}
