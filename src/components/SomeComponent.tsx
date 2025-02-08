import { useNetwork } from '../contexts/NetworkProvider';

export const SomeComponent = () => {
  const { isConnected, withNetworkCheck } = useNetwork();

  // 根据网络状态处理逻辑
  const handleAction = async () => {
    if (!isConnected) {
      // 显示提示或禁用某些功能
      return;
    }
    // 正常的网络请求
  };

  const handleFetch = async () => {
    try {
      const data = await withNetworkCheck(async () => {
        // 你的 API 调用
        return await api.getData();
      });
      // 处理数据
    } catch (error) {
      // 错误已经被 withNetworkCheck 处理
      console.error(error);
    }
  };

  return (
    // ...
  );
}; 