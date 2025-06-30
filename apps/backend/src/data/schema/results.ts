import { pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';

import { answers } from './answers';
import { users } from './users';
import { votes } from './votes';

export const results = pgTable('results', {
  id: uuid('id').primaryKey().defaultRandom(),
  voteId: uuid('vote_id')
    .notNull()
    .references(() => votes.id, { onDelete: 'cascade' }),
  answerId: uuid('answer_id')
    .notNull()
    .references(() => answers.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
