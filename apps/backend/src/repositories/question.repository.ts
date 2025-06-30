import { desc, eq } from 'drizzle-orm';

import { db } from '../data';
import { answers, questions } from '../data/schema';

export class QuestionRepository {
  async createQuestion(data: {
    content: string;
    createdBy: string;
    answers: string[];
  }) {
    return await db.transaction(async (tx) => {
      const [question] = await tx
        .insert(questions)
        .values({
          content: data.content,
          createdBy: data.createdBy,
        })
        .returning();

      const questionAnswers = await tx
        .insert(answers)
        .values(
          data.answers.map((content) => ({
            content,
            questionId: question.id,
          })),
        )
        .returning();

      return { ...question, answers: questionAnswers };
    });
  }

  async getQuestionById(id: string) {
    const question = await db.query.questions.findFirst({
      where: eq(questions.id, id),
      with: {
        answers: true,
        creator: {
          columns: {
            id: true,
            username: true,
            role: true,
          },
        },
      },
    });

    return question;
  }

  async getQuestionsByUser(userId: string) {
    const userQuestions = await db.query.questions.findMany({
      where: eq(questions.createdBy, userId),
      with: {
        answers: true,
      },
      orderBy: [desc(questions.createdAt)],
    });

    return userQuestions;
  }

  async getAllQuestions() {
    const allQuestions = await db.query.questions.findMany({
      with: {
        answers: true,
        creator: {
          columns: {
            id: true,
            username: true,
            role: true,
          },
        },
      },
      orderBy: [desc(questions.createdAt)],
    });

    return allQuestions;
  }

  async updateQuestion(id: string, data: { content?: string }) {
    const [updated] = await db
      .update(questions)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(questions.id, id))
      .returning();

    return updated;
  }

  async deleteQuestion(id: string) {
    await db.delete(questions).where(eq(questions.id, id));
  }
}
