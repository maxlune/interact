import jwt from 'jsonwebtoken';

import env from '../../../config/env';
import { UserRepository } from '../../../repositories/user.repository';
import { User } from '../../users/entities/user.entity';

const { REFRESH_SECRET, JWT_SECRET } = env;

export class AuthService {
  private UserRepository = new UserRepository();

  issueAccessToken(id: string): string {
    return jwt.sign({ userId: id }, JWT_SECRET, { expiresIn: '15m' });
  }

  async issueRefreshToken(id: string): Promise<string> {
    const refreshToken = jwt.sign({ userId: id }, REFRESH_SECRET, {
      expiresIn: '7d',
    });
    const user = await this.UserRepository.getUserById(id, {
      id: true,
      refreshToken: true,
    });
    if (user) {
      await this.UserRepository.updateUser({
        ...user,
        refreshToken: refreshToken,
      } as User);
    }

    return refreshToken;
  }

  async refreshAccessToken(refreshToken: string): Promise<string | void> {
    try {
      const payload = jwt.verify(
        refreshToken,
        REFRESH_SECRET,
      ) as jwt.JwtPayload;
      const user = await this.UserRepository.getUserById(payload.userId, {
        id: true,
        refreshToken: true,
      });

      if (user && user.refreshToken === refreshToken) {
        return this.issueAccessToken(payload.userId);
      }

      if (user) {
        user.refreshToken = '';
        await this.UserRepository.updateUser(user as User);
      }

      throw new Error('Invalid refresh token');
    } catch (err) {
      console.error(err);

      throw new Error('Invalid refresh token');
    }
  }

  async invalidateRefreshToken(userId: string): Promise<void> {
    const user = await this.UserRepository.getUserById(userId, {
      id: true,
      refreshToken: true,
    });

    if (user) {
      user.refreshToken = '';
      await this.UserRepository.updateUser(user as User);
    }
  }
}
