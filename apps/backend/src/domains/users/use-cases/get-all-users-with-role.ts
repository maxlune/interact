import { UserRepository } from '../../../repositories/user.repository';
import { User } from '../entities/user.entity';

export class GetAllUsersWithRole {
  private userRepository = new UserRepository();

  async getAllUsersWithRole(): Promise<Partial<User>[]> {
    return await this.userRepository.getAllUsersWithRole();
  }
}
