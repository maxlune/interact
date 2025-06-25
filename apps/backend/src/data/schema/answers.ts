import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

import { questions } from './questions';

export const answers = pgTable('answers', {
  id: uuid('id').primaryKey().defaultRandom(),
  content: text('content').notNull(),
  questionId: uuid('question_id')
    .notNull()
    .references(() => questions.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
