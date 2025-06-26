import { relations } from 'drizzle-orm';
import { pgEnum, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

import { questions } from './questions';
import { results } from './results';
import { votes } from './votes';

export const userRoleEnum = pgEnum('roles', ['admin', 'actor', 'spectator']);

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  username: varchar('username', { length: 255 }).notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  role: userRoleEnum('role').notNull().default('spectator'),
  refreshToken: varchar('refresh_token', { length: 1000 }),
});

export const userRelations = relations(users, ({ many }) => ({
  createdQuestions: many(questions, { relationName: 'questionCreator' }),
  createdVotes: many(votes, { relationName: 'voteCreator' }),
  results: many(results),
}));
