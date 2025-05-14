export interface EnvConfig {
  PORT: number;
  NODE_ENV: 'development' | 'test' | 'production';
  DATABASE_URL: string;
  TEST_DATABASE_URL: string;
}
