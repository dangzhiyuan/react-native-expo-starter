import { useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { useAuthStore } from '../store/authStore';
import NetInfo from '@react-native-community/netinfo';

export const useAppState = () => {
  const appState = useRef(AppState.currentState);
  const checkAuth = useAuthStore(state => state.checkAuth);

  useEffect(() => {
    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
      // 只处理从后台到前台的切换
      if (
        appState.current.match(/inactive|background/) && 
        nextAppState === 'active'
      ) {
        try {
          // 1. 检查网络状态
          const netInfo = await NetInfo.fetch();
          if (!netInfo.isConnected) {
            console.warn('Network is disconnected');
            return;
          }

          // 2. 刷新认证状态
          await checkAuth();

          // 3. 可以添加其他需要刷新的数据
          // await refreshImportantData();

        } catch (error) {
          console.error('App state change handler failed:', error);
        }
      }

      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, [checkAuth]);
}; 