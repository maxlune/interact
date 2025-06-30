import { and, desc, eq } from 'drizzle-orm';

import { db } from '../data';
import { votes } from '../data/schema';

export class VoteRepository {
  async createVote(data: {
    questionId: string;
    showId: string;
    createdBy: string;
  }) {
    const [vote] = await db.insert(votes).values(data).returning();

    return vote;
  }

  async getVoteById(id: string) {
    const vote = await db.query.votes.findFirst({
      where: eq(votes.id, id),
      with: {
        question: {
          with: {
            answers: true,
          },
        },
        creator: {
          columns: {
            id: true,
            username: true,
            role: true,
          },
        },
      },
    });

    return vote;
  }

  async getActiveVotesByShow(showId: string) {
    const activeVotes = await db.query.votes.findMany({
      where: and(eq(votes.showId, showId), eq(votes.status, 'active')),
      with: {
        question: {
          with: {
            answers: true,
          },
        },
      },
    });

    return activeVotes;
  }

  async getVotesByShow(showId: string) {
    const showVotes = await db.query.votes.findMany({
      where: eq(votes.showId, showId),
      with: {
        question: {
          with: {
            answers: true,
          },
        },
        creator: {
          columns: {
            id: true,
            username: true,
          },
        },
      },
      orderBy: [desc(votes.createdAt)],
    });

    return showVotes;
  }

  async startVote(id: string) {
    const [vote] = await db
      .update(votes)
      .set({
        status: 'active',
        startedAt: new Date(),
      })
      .where(eq(votes.id, id))
      .returning();

    return vote;
  }

  async closeVote(id: string) {
    const [vote] = await db
      .update(votes)
      .set({
        status: 'closed',
        closedAt: new Date(),
      })
      .where(eq(votes.id, id))
      .returning();

    return vote;
  }

  async deleteVote(id: string) {
    await db.delete(votes).where(eq(votes.id, id));
  }
}
