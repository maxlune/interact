import { pgEnum, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';

import { questions } from './questions';
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
  // TODO FK vers shows
  showId: uuid('show_id').notNull(),
  createdBy: uuid('created_by')
    .notNull()
    .references(() => users.id),
  status: voteStatusEnum('status').default('pending').notNull(),
  startedAt: timestamp('started_at'),
  closedAt: timestamp('closed_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
