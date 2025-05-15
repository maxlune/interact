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
      throw new Error('Impossible de récupérer les utilisateurs');
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
      throw new Error("Impossible de récupérer l'utilisateur");
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
      throw new Error("Impossible de récupérer l'utilisateur");
    }
  }

  async createUser(user: NewUser) {
    try {
      const [newUser] = await db.insert(users).values(user).returning();
      return newUser;
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de créer l'utilisateur");
    }
  }

  updateUser(user: User) {
    try {
      return db.update(users).set(user).where(eq(users.id, user.id)).execute();
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de mettre à jour l'utilisateur");
    }
  }
}
