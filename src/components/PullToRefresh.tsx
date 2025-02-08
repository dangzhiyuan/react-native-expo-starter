import React from "react";
import { RefreshControl } from "react-native";
import { useTheme } from "../themes/ThemeProvider";
import { useNetwork } from "../contexts/NetworkProvider";

interface Props {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
}

export const PullToRefresh: React.FC<Props> = ({ onRefresh, children }) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const { theme } = useTheme();
  const { withNetworkCheck } = useNetwork();

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await withNetworkCheck(onRefresh, { useFallback: true });
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={handleRefresh}
      colors={[theme.primary]}
      tintColor={theme.primary}
    >
      {children}
    </RefreshControl>
  );
};
