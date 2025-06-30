import { EnvConfig } from '../types/env.config';

if (process.env.NODE_ENV === 'production') {
  if (!process.env.JWT_SECRET || !process.env.REFRESH_SECRET) {
    throw new Error('JWT_SECRET and REFRESH_SECRET are required in production');
  }
}

const env: EnvConfig = {
  PORT: parseInt(process.env.PORT || '8080'),
  NODE_ENV:
    (process.env.NODE_ENV as 'development' | 'test' | 'production') ||
    'development',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
  JWT_SECRET: process.env.JWT_SECRET || 'dev-jwt-secret',
  REFRESH_SECRET: process.env.REFRESH_SECRET || 'dev-refresh-secret',
  DATABASE_URL:
    process.env.DATABASE_URL ||
    'postgres://postgres:admin@localhost:5432/interact-db',
  TEST_DATABASE_URL:
    process.env.TEST_DATABASE_URL ||
    'postgresql://test:test@localhost:5433/interact_test',
};

export default env;
