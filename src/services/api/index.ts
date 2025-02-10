import { createApi } from "./request";
import type {
  ApiResponse,
  LoginRequest,
  LoginResponse,
  UserProfile,
  UpdateProfileRequest,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from "./types";

// 创建API实例
const api = createApi();

// API方法集合
export const apiService = {
  auth: {
    login: (data: LoginRequest) =>
      api.post<ApiResponse<LoginResponse>>("/auth/login", data),

    logout: () => api.post<ApiResponse<void>>("/auth/logout"),

    refreshToken: (data: RefreshTokenRequest) =>
      api.post<ApiResponse<RefreshTokenResponse>>("/auth/refresh", data),
  },

  user: {
    getProfile: () => api.get<ApiResponse<UserProfile>>("/user/profile"),

    updateProfile: (data: UpdateProfileRequest) =>
      api.put<ApiResponse<UserProfile>>("/user/profile", data),
  },
};

export type { LoginRequest, LoginResponse, UserProfile, UpdateProfileRequest };

// 使用示例
const login = async (username: string, password: string) => {
  try {
    const response = await apiService.auth.login({ username, password });
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};
