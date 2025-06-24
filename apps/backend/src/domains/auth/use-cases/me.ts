import { UserRepository } from '../../../repositories/user.repository';
import { AuthUser } from '../entities/auth.entity';

export class Me {
  private userRepository = new UserRepository();

  async execute(userId: string): Promise<AuthUser> {
    const user = await this.userRepository.getUserById(userId, {
      id: true,
      username: true,
      role: true,
    });

    if (!user) {
      throw new Error('User not found');
    }

    return {
      userId: user.id!,
      username: user.username!,
      role: user.role!,
      // role: user.role! as UserRole,
    };
  }
}
