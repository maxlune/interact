import { desc, eq } from 'drizzle-orm';

import { db } from '../data';
import { shows, votes } from '../data/schema';

export class ShowRepository {
  async createShow(data: {
    title: string;
    description?: string;
    startDate: Date;
    endDate: Date;
    createdBy: string;
  }) {
    const [show] = await db.insert(shows).values(data).returning();

    return show;
  }

  async getShowById(id: string) {
    return db.query.shows.findFirst({
      where: eq(shows.id, id),
      with: {
        creator: {
          columns: {
            id: true,
            username: true,
            role: true,
          },
        },
        votes: {
          with: {
            question: {
              with: {
                answers: true,
              },
            },
          },
          orderBy: [desc(votes.createdAt)],
        },
      },
    });
  }

  async getAllShows() {
    return db.query.shows.findMany({
      with: {
        creator: {
          columns: {
            id: true,
            username: true,
            role: true,
          },
        },
        votes: {
          columns: {
            id: true,
            status: true,
          },
        },
      },
      orderBy: [desc(shows.startDate)],
    });
  }

  async getShowsByCreator(createdBy: string) {
    return db.query.shows.findMany({
      where: eq(shows.createdBy, createdBy),
      with: {
        votes: {
          columns: {
            id: true,
            status: true,
          },
        },
      },
      orderBy: [desc(shows.createdAt)],
    });
  }

  async updateShow(
    id: string,
    data: {
      title?: string;
      description?: string;
      startDate?: Date;
      endDate?: Date;
      status?: 'upcoming' | 'live' | 'ended';
    },
  ) {
    const [updated] = await db
      .update(shows)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(shows.id, id))
      .returning();

    return updated;
  }

  async deleteShow(id: string) {
    await db.delete(shows).where(eq(shows.id, id));
  }

  async getUpcomingShows() {
    return db.query.shows.findMany({
      where: eq(shows.status, 'upcoming'),
      with: {
        creator: {
          columns: {
            id: true,
            username: true,
          },
        },
      },
      orderBy: [shows.startDate],
    });
  }

  async getLiveShows() {
    return db.query.shows.findMany({
      where: eq(shows.status, 'live'),
      with: {
        creator: {
          columns: {
            id: true,
            username: true,
          },
        },
        votes: {
          where: eq(votes.status, 'active'),
          with: {
            question: {
              with: {
                answers: true,
              },
            },
          },
        },
      },
      orderBy: [shows.startDate],
    });
  }
}
