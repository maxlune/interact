import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

// TODO Ici env.test pour les tests dans un nouveau fichier
import env from '../config/env';

import * as schema from './schema';

const { DATABASE_URL } = env;

export const pool = new Pool({
  connectionString: DATABASE_URL,
});

export const db: NodePgDatabase<typeof schema> = drizzle(pool, { schema });
