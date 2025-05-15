import { EnvConfig } from '../types/env.config';

const env: EnvConfig = {
  PORT: parseInt(process.env.PORT || '8080'),
  NODE_ENV:
    (process.env.NODE_ENV as 'development' | 'test' | 'production') ||
    'development',
  JWT_SECRET: process.env.JWT_SECRET || 'JWT_SECRET:!',
  REFRESH_SECRET: process.env.REFRESH_SECRET || 'REFRESH_SECRET§:!',
  DATABASE_URL:
    process.env.DATABASE_URL ||
    // TODO : Change username, password and port
    'postgres://maximilien:admin@localhost:5432/interact-db',
  TEST_DATABASE_URL:
    process.env.TEST_DATABASE_URL ||
    'postgresql://test:test@localhost:5433/interact_test',
};

export default env;
