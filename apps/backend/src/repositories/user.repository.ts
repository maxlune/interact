import { eq } from 'drizzle-orm';

import { db } from '../data';
import { users } from '../data/schema';
import {
  NewUser,
  User,
  UserColumns,
} from '../domains/users/entities/user.entity';

export class UserRepository {
  getAllUsers(): Promise<Partial<User>[]> {
    try {
      return db.query.users.findMany({
        columns: {
          id: true,
          username: true,
        },
      });
    } catch (err) {
      console.error(err);
      throw new Error('Failed to retrieve users');
    }
  }

  async getAllUsersWithRole(): Promise<Partial<User>[]> {
    try {
      return db.query.users.findMany({
        columns: {
          id: true,
          username: true,
          role: true,
        },
      });
    } catch (err) {
      console.error(err);
      throw new Error('Failed to retrieve users');
    }
  }

  getUserById(
    id: string,
    columns: UserColumns,
  ): Promise<Partial<User | undefined>> {
    try {
      return db.query.users.findFirst({
        where: eq(users.id, id),
        columns,
      });
    } catch (err) {
      console.error(err);
      throw new Error('Failed to retrieve user');
    }
  }

  getUserByUsername(
    username: string,
    columns: UserColumns,
  ): Promise<Partial<User | undefined>> {
    try {
      return db.query.users.findFirst({
        where: eq(users.username, username),
        columns,
      });
    } catch (err) {
      console.error(err);
      throw new Error('Failed to retrieve user');
    }
  }

  async createUser(user: NewUser) {
    try {
      const [newUser] = await db.insert(users).values(user).returning();
      return newUser;
    } catch (err) {
      console.error(err);
      throw new Error('Failed to create user');
    }
  }

  updateUser(user: User) {
    try {
      return db.update(users).set(user).where(eq(users.id, user.id)).execute();
    } catch (err) {
      console.error(err);
      throw new Error('Failed to update user');
    }
  }
}
