import { describe, expect, it } from 'vitest';

import { NewUser, User } from './user.entity';

describe('User Entity', () => {
  it('User has all required fields', () => {
    const user: User = {
      id: '1',
      username: 'john',
      password: 'password',
    };

    expect(user).toEqual({
      id: '1',
      username: 'john',
      password: 'password',
    });
  });

  it('NewUser works without id', () => {
    const newUser: NewUser = {
      username: 'john',
      password: 'password',
    };

    expect(newUser.username).toBe('john');
    expect(newUser.password).toBe('password');
  });

  it('NewUser accepts optional id', () => {
    const newUser: NewUser = {
      id: '123',
      username: 'john',
      password: 'password',
    };
    expect(newUser.id).toBe('123');
  });
});
