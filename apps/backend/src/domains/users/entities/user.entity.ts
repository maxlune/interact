import { InferInsertModel, InferSelectModel } from 'drizzle-orm';

import { users } from '../../../data/schema';

export type User = InferSelectModel<typeof users>;

export type NewUser = InferInsertModel<typeof users>;

export type UserColumns = { [K in keyof User]?: boolean };
