import bcrypt from 'bcrypt';

import { UserRepository } from '../../../repositories/user.repository';
import {
  AuthTokens,
  AuthUser,
  LoginCredentials,
} from '../entities/auth.entity';
import { AuthService } from '../services/auth.service';

export interface LoginResult {
  user: AuthUser;
  tokens: AuthTokens;
}

export class Login {
  private userRepository = new UserRepository();
  private authService = new AuthService();

  async execute(credentials: LoginCredentials): Promise<LoginResult> {
    const { username, password } = credentials;

    const user = await this.userRepository.getUserByUsername(username, {
      id: true,
      username: true,
      password: true,
    });

    if (!user) {
      throw new Error('Authentication failed');
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password as string,
    );

    if (!isPasswordValid) {
      throw new Error('Authentication failed');
    }

    const accessToken = this.authService.issueAccessToken(user.id as string);
    const refreshToken = await this.authService.issueRefreshToken(
      user.id as string,
    );

    return {
      user: {
        userId: user.id as string,
        username: user.username as string,
      },
      tokens: {
        accessToken,
        refreshToken,
      },
    };
  }
}
