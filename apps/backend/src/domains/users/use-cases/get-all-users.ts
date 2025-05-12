import {UserRepository} from "../../../repositories/user.repository";
import {User} from "../entities/user.entity";

export class GetAllUsers {
  private userRepository = new UserRepository();

  async getAllUsers(): Promise<Partial<User>[]> {
    try {
      return await this.userRepository.getAllUsers();
    } catch(error) {
      console.error("Erreur lors de la récupération des utilisateurs:", error);
      return [];
    }
  }
}