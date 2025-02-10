import AsyncStorage from "@react-native-async-storage/async-storage";

interface CacheConfig {
  ttl: number;
  version?: string;
}

interface CacheData<T> {
  data: T;
  timestamp: number;
  version: string;
}

export class CacheManager {
  private static instance: CacheManager;
  private readonly defaultTTL = 1000 * 60 * 60; // 1 hour
  private readonly version = "1.0.0";

  static getInstance() {
    if (!CacheManager.instance) {
      CacheManager.instance = new CacheManager();
    }
    return CacheManager.instance;
  }

  async set<T>(key: string, data: T, config?: Partial<CacheConfig>) {
    const cacheData: CacheData<T> = {
      data,
      timestamp: Date.now(),
      version: config?.version || this.version,
    };
    await AsyncStorage.setItem(key, JSON.stringify(cacheData));
  }

  async get<T>(key: string, config?: Partial<CacheConfig>): Promise<T | null> {
    try {
      const cached = await AsyncStorage.getItem(key);
      if (!cached) return null;

      const cacheData: CacheData<T> = JSON.parse(cached);
      const ttl = config?.ttl || this.defaultTTL;

      if (
        Date.now() - cacheData.timestamp > ttl ||
        cacheData.version !== (config?.version || this.version)
      ) {
        await this.remove(key);
        return null;
      }

      return cacheData.data;
    } catch {
      return null;
    }
  }

  async remove(key: string) {
    await AsyncStorage.removeItem(key);
  }

  async clear() {
    await AsyncStorage.clear();
  }
}

export const cacheManager = CacheManager.getInstance();
