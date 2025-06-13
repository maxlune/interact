import { Request } from 'express';

import { UserRole } from '../users/user-roles';

declare module 'express-serve-static-core' {
  interface Request {
    user: { userId: string; name: string; role?: UserRole };
  }
}

export interface CustomRequest extends Request {
  user: { userId: string; name: string; role?: UserRole };
}
