import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000,
});

// 添加网络错误拦截器
api.interceptors.response.use(
  response => response,
  error => {
    if (!error.response) {
      // 网络错误
      throw new Error('Network request failed');
    }
    throw error;
  }
);

export default api; 