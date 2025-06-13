import { pgEnum, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const userRoleEnum = pgEnum('roles', ['admin', 'actor', 'spectator']);

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  username: varchar('username', { length: 255 }).notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  role: userRoleEnum('role').notNull().default('spectator'),
  refreshToken: varchar('refresh_token', { length: 1000 }),
});
