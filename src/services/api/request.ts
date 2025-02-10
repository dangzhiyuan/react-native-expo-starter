import axios, { AxiosInstance, AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_CONFIG } from "@/config/api";

// 错误处理函数
const handleApiError = (error: AxiosError) => {
  if (error.response) {
    // 服务器返回错误状态码
    switch (error.response.status) {
      case 401:
        // 未授权，清除token并重定向到登录页
        AsyncStorage.removeItem("token");
        // 可以通过事件触发重定向
        break;
      case 403:
        // 权限不足
        break;
      case 404:
        // 资源不存在
        break;
      case 500:
        // 服务器错误
        break;
      default:
        // 其他错误
        break;
    }
  } else if (error.request) {
    // 请求发出但没有收到响应
    console.error("Network Error:", error.request);
  } else {
    // 请求配置出错
    console.error("Error:", error.message);
  }
};

// 请求拦截器配置
const setupInterceptors = (api: AxiosInstance) => {
  api.interceptors.request.use(
    async (config) => {
      // 添加 token
      const token = await AsyncStorage.getItem("token");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => response.data,
    async (error: AxiosError) => {
      // 统一错误处理
      handleApiError(error);
      return Promise.reject(error);
    }
  );
};

// 创建 API 实例
export const createApi = (baseURL = API_CONFIG.baseURL) => {
  const api = axios.create({
    baseURL,
    timeout: API_CONFIG.timeout,
    headers: {
      "Content-Type": "application/json",
    },
  });

  setupInterceptors(api);
  return api;
};
