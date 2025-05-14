import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import '../../../tests/integration.setup';

import { users } from '../../../data/schema';
import { testDb } from '../../../tests/integration.setup';

import { GetAllUsers } from './get-all-users';

describe('GetAllUsers Integration Test', () => {
  let getAllUsers: GetAllUsers;

  beforeEach(async () => {
    getAllUsers = new GetAllUsers();
    (getAllUsers as any).userRepository = {
      getAllUsers: async () => {
        return testDb.query.users.findMany({
          columns: {
            id: true,
            username: true,
          },
        });
      },
    };

    await testDb.delete(users);
    await testDb.insert(users).values([
      { username: 'john', password: 'password123' },
      { username: 'jane', password: 'password456' },
    ]);
  });

  afterEach(async () => {
    await testDb.delete(users);
  });

  it('retrieves all users from database', async () => {
    const result = await getAllUsers.getAllUsers();

    expect(result).toHaveLength(2);
    expect(result[0]).toMatchObject({ username: 'john' });
    expect(result[1]).toMatchObject({ username: 'jane' });
  });

  it('handles empty database', async () => {
    await testDb.delete(users);

    const result = await getAllUsers.getAllUsers();

    expect(result).toEqual([]);
  });
});
