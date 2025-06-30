import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

import { answers } from './answers';
import { users } from './users';
import { votes } from './votes';

export const questions = pgTable('questions', {
  id: uuid('id').primaryKey().defaultRandom(),
  content: text('content').notNull(),
  createdBy: uuid('created_by')
    .notNull()
    .references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const questionRelations = relations(questions, ({ many, one }) => ({
  answers: many(answers),
  votes: many(votes),
  creator: one(users, {
    fields: [questions.createdBy],
    references: [users.id],
  }),
}));
