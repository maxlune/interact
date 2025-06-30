import { relations } from 'drizzle-orm';
import { pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

import { users } from './users';
import { votes } from './votes';

export const showStatusEnum = pgEnum('show_status', [
  'upcoming',
  'live',
  'ended',
]);

export const shows = pgTable('shows', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  description: text('description'),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date').notNull(),
  status: showStatusEnum('status').default('upcoming').notNull(),
  createdBy: uuid('created_by')
    .notNull()
    .references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const showRelations = relations(shows, ({ one, many }) => ({
  creator: one(users, {
    fields: [shows.createdBy],
    references: [users.id],
  }),
  votes: many(votes),
}));
