import { QuestionRepository } from '../../../repositories/question.repository';
import { VoteRepository } from '../../../repositories/vote.repository';

export class CreateVote {
  private voteRepository = new VoteRepository();
  private questionRepository = new QuestionRepository();

  async execute(data: {
    questionId: string;
    showId: string;
    createdBy: string;
  }) {
    if (!data.questionId || !data.showId || !data.createdBy) {
      throw new Error('Données manquantes pour créer le vote');
    }

    const question = await this.questionRepository.getQuestionById(
      data.questionId,
    );

    if (!question) {
      throw new Error('Question introuvable');
    }

    if (!question.answers || question.answers.length < 2) {
      throw new Error('La question doit avoir au moins 2 réponses');
    }

    // 4. TODO: Vérifier que le showId existe quand le schéma shows sera créé
    // Pour l'instant accepte tout UUID valide

    const vote = await this.voteRepository.createVote({
      questionId: data.questionId,
      showId: data.showId,
      createdBy: data.createdBy,
    });

    const voteWithRelations = await this.voteRepository.getVoteById(vote.id);

    return {
      id: vote.id,
      status: vote.status,
      showId: vote.showId,
      createdAt: vote.createdAt,
      question: {
        id: voteWithRelations?.question?.id,
        content: voteWithRelations?.question?.content,
        answers: voteWithRelations?.question?.answers?.map((answer) => ({
          id: answer.id,
          content: answer.content,
        })),
      },
      creator: voteWithRelations?.creator,
      message: 'Vote créé avec succès',
    };
  }
}
