import bcrypt from 'bcrypt';

import { UserRepository } from '../../../repositories/user.repository';
import { RegisterData } from '../entities/auth.entity';

export interface RegisterResult {
  username: string;
}

export class Register {
  private userRepository = new UserRepository();

  async execute(data: RegisterData): Promise<RegisterResult> {
    const { username, password, confirmPassword } = data;

    if (!username?.trim() || !password?.trim() || !confirmPassword?.trim()) {
      throw new Error('Invalid username or password');
    }

    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }

    const existingUsername = await this.userRepository.getUserByUsername(
      username,
      { username: true },
    );
    if (existingUsername) {
      throw new Error('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await this.userRepository.createUser({
      username,
      password: hashedPassword,
    });

    return { username };
  }
}
