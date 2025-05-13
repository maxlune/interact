import { db } from '../data';
import { users } from '../data/schema';
import { NewUser, User } from '../domains/users/entities/user.entity';

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

  async createUser(userData: NewUser): Promise<User> {
    try {
      const [newUser] = await db.insert(users).values(userData).returning();
      return newUser;
    } catch (err) {
      console.error(err);
      throw new Error("Impossible de créer l'utilisateur");
    }
  }
}
