export interface EnvConfig {
  PORT: number;
  NODE_ENV: 'development' | 'test' | 'production';
  DATABASE_URL: string;
}