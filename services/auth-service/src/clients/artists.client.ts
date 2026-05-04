const ARTISTS_SERVICE_URL = process.env.ARTISTS_SERVICE_URL || 'http://artists-service:4003';

export const artistsClient = {
  async getAuthIdsByCategory(category: string): Promise<string[]> {
    try {
      const internalSecret = process.env.INTERNAL_SERVICE_SECRET;
      if (!internalSecret) return [];
      const res = await fetch(
        `${ARTISTS_SERVICE_URL}/artists/internal/auth-ids?category=${encodeURIComponent(category)}`,
        { headers: { 'x-internal-secret': internalSecret } }
      );
      if (!res.ok) return [];
      const data = await res.json() as { authIds: string[] };
      return data.authIds ?? [];
    } catch {
      return [];
    }
  },
};
