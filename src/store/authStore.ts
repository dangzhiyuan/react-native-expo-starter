import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_TOKEN_KEY = '@auth_token';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: {
    id: string;
    username: string;
    email: string;
  } | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  token: null,
  user: null,

  login: async (username: string, password: string) => {
    try {
      // 添加2秒延迟
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 模拟API调用
      const token = 'mock_token';
      await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
      
      set({
        isAuthenticated: true,
        token,
        user: {
          id: '1',
          username,
          email: `${username}@example.com`,
        },
      });
    } catch (error) {
      throw new Error('Login failed');
    }
  },

  logout: async () => {
    try {
      await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
      set({
        isAuthenticated: false,
        token: null,
        user: null,
      });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  },

  checkAuth: async () => {
    try {
      const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
      if (token) {
        // 模拟验证token
        set({
          isAuthenticated: true,
          token,
          user: {
            id: '1',
            username: 'demo',
            email: 'demo@example.com',
          },
        });
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    }
  },
})); 