export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  password: string;
  confirmPassword: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthUser {
  userId: string;
  username: string;
}
