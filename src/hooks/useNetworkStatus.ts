import { useState, useEffect, useCallback } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { useToast } from '../components/Toast/ToastContext';
import { useAuthStore } from '../store/authStore';

export const useNetworkStatus = () => {
  const [isConnected, setIsConnected] = useState(true);
  const { showToast } = useToast();
  const checkAuth = useAuthStore(state => state.checkAuth);

  // 网络恢复后的处理
  const handleNetworkRestore = useCallback(async () => {
    try {
      // 刷新认证状态
      await checkAuth();
      // 刷新其他需要的数据
      // await refetchImportantData();
      
      showToast('网络已恢复连接', { type: 'success' });
    } catch (error) {
      console.error('Network restore handler failed:', error);
    }
  }, [checkAuth]);

  useEffect(() => {
    let isSubscribed = true; // 添加订阅标志

    const unsubscribe = NetInfo.addEventListener(state => {
      if (!isSubscribed) return; // 检查是否仍然订阅
      const newIsConnected = state.isConnected ?? true;
      
      if (!newIsConnected && isConnected) {
        // 网络断开
        showToast('网络连接已断开', { 
          type: 'error',
          duration: 0,
        });
        setIsConnected(false);
      } else if (newIsConnected && !isConnected) {
        // 网络恢复
        handleNetworkRestore();
        setIsConnected(true);
      }
    });

    return () => {
      isSubscribed = false;
      unsubscribe();
    };
  }, [isConnected, handleNetworkRestore]);

  return {
    isConnected,
    // 导出一个包装过的请求函数
    withNetworkCheck: async <T>(apiCall: () => Promise<T>): Promise<T> => {
      if (!isConnected) {
        showToast('当前无网络连接', { type: 'error' });
        throw new Error('No network connection');
      }
      try {
        return await apiCall();
      } catch (error) {
        if (error instanceof Error && error.message === 'Network request failed') {
          showToast('网络请求失败，请检查网络连接', { type: 'error' });
        }
        throw error;
      }
    }
  };
}; 