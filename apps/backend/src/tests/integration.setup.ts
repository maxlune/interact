import path from 'path';

import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';
import { afterAll, beforeAll } from 'vitest';

import env from '../config/env';
import * as schema from '../data/schema';

const TEST_DATABASE_URL = env.TEST_DATABASE_URL;

let pool: Pool;
export let testDb: NodePgDatabase<typeof schema>;

export async function setupTestDatabase() {
  pool = new Pool({ connectionString: TEST_DATABASE_URL });
  testDb = drizzle(pool, { schema });

  const migrationsPath = path.join(__dirname, '../data/drizzle');

  await migrate(testDb, {
    migrationsFolder: migrationsPath,
  });
}

export async function cleanupTestDatabase() {
  if (pool) {
    await pool.end();
  }
}

beforeAll(async () => {
  await setupTestDatabase();
});

afterAll(async () => {
  await cleanupTestDatabase();
});
