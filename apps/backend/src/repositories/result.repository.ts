import { and, eq, sql } from 'drizzle-orm';

import { db } from '../data';
import { results } from '../data/schema';

export class ResultRepository {
  async createResult(data: {
    voteId: string;
    answerId: string;
    userId?: string;
  }) {
    // Vérification anti-doublon
    if (data.userId) {
      const existing = await db
        .select()
        .from(results)
        .where(
          and(eq(results.voteId, data.voteId), eq(results.userId, data.userId)),
        )
        .limit(1);

      if (existing.length > 0) {
        throw new Error('Vous avez déjà voté pour cette question');
      }
    }

    const [result] = await db.insert(results).values(data).returning();

    return result;
  }

  // Rquête d'aggrégation : résultats d'un vote
  async getVoteResultsWithSQL(voteId: string) {
    const sqlQuery = sql`
        SELECT
            a.id as answer_id,
            a.content as answer_content,
            COUNT(r.id) as vote_count,
            ROUND(
                    COUNT(r.id) * 100.0 /
                    NULLIF((SELECT COUNT(*) FROM results WHERE vote_id = ${voteId}), 0),
                    2
            ) as percentage
        FROM answers a
                 LEFT JOIN results r ON a.id = r.answer_id AND r.vote_id = ${voteId}
        WHERE a.question_id = (
            SELECT question_id FROM votes WHERE id = ${voteId}
        )
        GROUP BY a.id, a.content
        ORDER BY vote_count DESC
    `;

    const rawResults = await db.execute(sqlQuery);

    const totalVotes = rawResults.rows.reduce(
      (sum: number, row: any) => sum + Number(row.vote_count),
      0,
    );

    return {
      results: rawResults.rows.map((row: any) => ({
        answerId: row.answer_id,
        answerContent: row.answer_content,
        voteCount: Number(row.vote_count),
        percentage: Number(row.percentage),
      })),
      totalVotes,
    };
  }
}
