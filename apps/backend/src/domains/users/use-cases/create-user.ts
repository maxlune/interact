import {UserRepository} from "../../../repositories/user.repository";
import {User, NewUser} from "../entities/user.entity";

export class CreateUser {
  private userRepository = new UserRepository();

  async createUser(userData: NewUser): Promise<User | null> {
    try {
      return await this.userRepository.createUser(userData);
    } catch(error) {
      console.error("Erreur lors de la création de l'utilisateur:", error);
      return null;
    }
  }
}