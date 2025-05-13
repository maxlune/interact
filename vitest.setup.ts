import { beforeEach, vi } from 'vitest';

process.env.NODE_ENV = 'test';
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test';

beforeEach(() => {
  vi.clearAllMocks();
});
