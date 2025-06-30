import { ShowRepository } from '../../../repositories/show.repository';

export class GetShowById {
  private showRepository = new ShowRepository();

  async execute(showId: string) {
    const show = await this.showRepository.getShowById(showId);

    if (!show) {
      throw new Error('Spectacle introuvable');
    }

    return {
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
      votes:
        show.votes?.map((vote) => ({
          id: vote.id,
          status: vote.status,
          question: {
            id: vote.question?.id,
            content: vote.question?.content,
            answers: vote.question?.answers?.map((answer) => ({
              id: answer.id,
              content: answer.content,
            })),
          },
          createdAt: vote.createdAt,
          startedAt: vote.startedAt,
          closedAt: vote.closedAt,
        })) || [],
      createdAt: show.createdAt,
      updatedAt: show.updatedAt,
    };
  }
}
