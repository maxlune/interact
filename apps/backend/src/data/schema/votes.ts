import { relations } from 'drizzle-orm';
import { pgEnum, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';

import { questions } from './questions';
import { results } from './results';
import { shows } from './shows';
import { users } from './users';

export const voteStatusEnum = pgEnum('vote_status', [
  'pending',
  'active',
  'closed',
]);

export const votes = pgTable('votes', {
  id: uuid('id').primaryKey().defaultRandom(),
  questionId: uuid('question_id')
    .notNull()
    .references(() => questions.id, { onDelete: 'cascade' }),
  showId: uuid('show_id')
    .notNull()
    .references(() => shows.id, { onDelete: 'cascade' }),
  createdBy: uuid('created_by')
    .notNull()
    .references(() => users.id),
  status: voteStatusEnum('status').default('pending').notNull(),
  startedAt: timestamp('started_at'),
  closedAt: timestamp('closed_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const voteRelations = relations(votes, ({ one, many }) => ({
  question: one(questions, {
    fields: [votes.questionId],
    references: [questions.id],
  }),
  show: one(shows, {
    fields: [votes.showId],
    references: [shows.id],
  }),
  creator: one(users, {
    fields: [votes.createdBy],
    references: [users.id],
  }),
  results: many(results),
}));
