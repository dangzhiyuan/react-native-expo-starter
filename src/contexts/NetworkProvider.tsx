import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
import { OfflineNotice } from "../components/OfflineNotice";
import { useToast } from "../components/Toast/ToastContext";
import { useAuthStore } from "../store/authStore";

interface NetworkContextType {
  isConnected: boolean;
  connectionType: string | null;
  withNetworkCheck: <T>(
    apiCall: () => Promise<T>,
    options?: { useFallback?: boolean }
  ) => Promise<T>;
}

const NetworkContext = createContext<NetworkContextType>({
  isConnected: true,
  connectionType: null,
  withNetworkCheck: async () => {
    throw new Error("NetworkProvider not found");
  },
});

export const useNetwork = () => useContext(NetworkContext);

class NetworkError extends Error {
  type: string;
  recoverable: boolean;

  constructor(
    message: string,
    options: { type: string; recoverable: boolean }
  ) {
    super(message);
    this.name = "NetworkError";
    this.type = options.type;
    this.recoverable = options.recoverable;
  }
}

export const NetworkProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [networkState, setNetworkState] = useState({
    isConnected: true,
    connectionType: null as string | null,
  });
  const { showToast } = useToast();
  const checkAuth = useAuthStore((state) => state.checkAuth);

  // 网络恢复后的处理
  const handleNetworkRestore = useCallback(async () => {
    try {
      await checkAuth();
      // 可以添加其他需要刷新的数据
      showToast("网络已恢复连接", { type: "success" });
    } catch (error) {
      console.error("Network restore handler failed:", error);
    }
  }, [checkAuth, showToast]);

  useEffect(() => {
    let isSubscribed = true;

    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      if (!isSubscribed) return;

      const newIsConnected = state.isConnected ?? true;

      if (!newIsConnected && networkState.isConnected) {
        // 网络断开
        showToast("网络连接已断开", {
          type: "error",
          duration: 0,
        });
      } else if (newIsConnected && !networkState.isConnected) {
        // 网络恢复
        handleNetworkRestore();
      }

      setNetworkState({
        isConnected: newIsConnected,
        connectionType: state.type,
      });
    });

    return () => {
      isSubscribed = false;
      unsubscribe();
    };
  }, [networkState.isConnected, handleNetworkRestore, showToast]);

  // 网络检查工具函数
  const withNetworkCheck = async <T,>(
    apiCall: () => Promise<T>,
    options: { useFallback?: boolean } = {}
  ): Promise<T> => {
    if (!networkState.isConnected) {
      if (options.useFallback) {
        // 对于不重要的操作，使用 Toast 提示
        showToast("当前无网络连接", { type: "error" });
        throw new Error("No network connection");
      } else {
        // 对于重要操作，抛出 NetworkError
        throw new NetworkError("当前无网络连接", {
          type: "network_offline",
          recoverable: true,
        });
      }
    }

    try {
      return await apiCall();
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Network request failed") {
          if (options.useFallback) {
            showToast("网络请求失败，请检查网络连接", { type: "error" });
          } else {
            throw new NetworkError("网络请求失败", {
              type: "network_request_failed",
              recoverable: true,
            });
          }
        }
      }
      throw error;
    }
  };

  const value = {
    ...networkState,
    withNetworkCheck,
  };

  return (
    <NetworkContext.Provider value={value}>
      {children}
      {!networkState.isConnected && <OfflineNotice />}
    </NetworkContext.Provider>
  );
};
