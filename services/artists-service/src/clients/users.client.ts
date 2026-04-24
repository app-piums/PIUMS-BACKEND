import { logger } from '../utils/logger';

const USERS_SERVICE_URL = process.env.USERS_SERVICE_URL || 'http://users-service:4002';

export interface UserProfile {
  id: string;
  nombre?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  email?: string;
  avatar?: string;
}

class UsersClient {
  async getUser(userId: string): Promise<UserProfile | null> {
    try {
      const res = await fetch(`${USERS_SERVICE_URL}/api/users/${userId}`, {
        headers: { 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(4000),
      });
      if (!res.ok) return null;
      return await res.json() as UserProfile;
    } catch (error: any) {
      logger.warn('Error fetching user from users-service', 'USERS_CLIENT', {
        userId,
        error: error.message,
      });
      return null;
    }
  }
}

export const usersClient = new UsersClient();
