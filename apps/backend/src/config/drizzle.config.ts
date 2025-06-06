import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

import env from './env';

const { DATABASE_URL } = env;

export default defineConfig({
  schema: 'src/data/schema/index.ts',
  out: 'src/data/drizzle',
  dialect: "postgresql",
  dbCredentials: {
    url: DATABASE_URL
  },
  verbose: true,
})