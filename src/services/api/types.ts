// 基础响应类型
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  code: number;
}

// 登录请求参数
export interface LoginRequest {
  username: string;
  password: string;
}

// 登录响应数据
export interface LoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
    role: string;
    avatar?: string;
  };
}

// 用户信息
export interface UserProfile {
  id: string;
  username: string;
  email: string;
  role: string;
  avatar?: string;
  name?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

// 更新用户信息请求
export interface UpdateProfileRequest {
  name?: string;
  email?: string;
  phone?: string;
  avatar?: string;
}

// 刷新token请求
export interface RefreshTokenRequest {
  token: string;
}

// 刷新token响应
export interface RefreshTokenResponse {
  token: string;
  expiresIn: number;
}
