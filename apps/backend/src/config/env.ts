import { EnvConfig } from '../types/env.config';

const env: EnvConfig = {
  PORT: parseInt(process.env.PORT || '8080'),
  NODE_ENV:
    (process.env.NODE_ENV as 'development' | 'test' | 'production') ||
    'development',
  DATABASE_URL:
    process.env.DATABASE_URL ||
    // TODO : Change username, password and port
    'postgres://maximilien:admin@localhost:5432/interact-db',
};

export default env;
