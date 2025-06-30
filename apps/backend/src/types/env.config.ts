export interface EnvConfig {
  PORT: number;
  NODE_ENV: 'development' | 'test' | 'production';
  FRONTEND_URL: string;
  DATABASE_URL: string;
  TEST_DATABASE_URL: string;
  JWT_SECRET: string;
  REFRESH_SECRET: string;
}
