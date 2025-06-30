// TODO MOVE THIS TO QUESTION DOMAIN
import { QuestionRepository } from '../../../repositories/question.repository';

export class CreateQuestion {
  private questionRepository = new QuestionRepository();

  async execute(data: {
    content: string;
    answers: string[];
    createdBy: string;
  }) {
    if (!data.content?.trim()) {
      throw new Error('Le contenu de la question est obligatoire');
    }

    if (!data.answers || data.answers.length < 2) {
      throw new Error('Une question doit avoir au moins 2 réponses');
    }

    if (data.answers.length > 10) {
      throw new Error('Une question ne peut pas avoir plus de 10 réponses');
    }

    const validAnswers = data.answers.filter((answer) => answer?.trim());

    if (validAnswers.length !== data.answers.length) {
      throw new Error('Toutes les réponses doivent être renseignées');
    }

    const uniqueAnswers = [
      ...new Set(validAnswers.map((a) => a.trim().toLowerCase())),
    ];

    if (uniqueAnswers.length !== validAnswers.length) {
      throw new Error('Les réponses doivent être uniques');
    }

    const question = await this.questionRepository.createQuestion({
      content: data.content.trim(),
      answers: validAnswers.map((a) => a.trim()),
      createdBy: data.createdBy,
    });

    return {
      id: question.id,
      content: question.content,
      answers: question.answers,
      createdAt: question.createdAt,
      message: 'Question créée avec succès',
    };
  }
}
