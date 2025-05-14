import { UserRepository } from '../../../repositories/user.repository';
import { User } from '../entities/user.entity';

export class GetAllUsers {
  private userRepository = new UserRepository();

  async getAllUsers(): Promise<Partial<User>[]> {
    return await this.userRepository.getAllUsers();
  }
}
