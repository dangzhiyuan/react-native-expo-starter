import AsyncStorage from "@react-native-async-storage/async-storage";
import { cacheManager } from "../cache";

class StorageService {
  async set(key: string, value: any) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error("Storage set error:", error);
    }
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error("Storage get error:", error);
      return null;
    }
  }

  async remove(key: string) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error("Storage remove error:", error);
    }
  }

  async clear() {
    try {
      await AsyncStorage.clear();
      await cacheManager.clear();
    } catch (error) {
      console.error("Storage clear error:", error);
    }
  }
}

export const storageService = new StorageService();
