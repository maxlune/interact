import { ShowRepository } from '../../../repositories/show.repository';

export class GetLiveShows {
  private showRepository = new ShowRepository();

  async execute() {
    const liveShows = await this.showRepository.getLiveShows();

    return liveShows.map((show) => ({
      id: show.id,
      title: show.title,
      description: show.description,
      startDate: show.startDate,
      endDate: show.endDate,
      creator: {
        username: show.creator.username,
      },
      activeVotes:
        show.votes
          ?.filter((v) => v.status === 'active')
          .map((vote) => ({
            id: vote.id,
            question: {
              content: vote.question?.content,
              answers: vote.question?.answers?.map((a) => ({
                id: a.id,
                content: a.content,
              })),
            },
          })) || [],
    }));
  }
}
