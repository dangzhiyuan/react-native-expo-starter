import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useTheme } from "../../themes/ThemeProvider";

interface InfiniteListProps<T> {
  data: T[];
  renderItem: ({ item, index }: { item: T; index: number }) => React.ReactNode;
  onEndReached?: () => void;
  loading?: boolean;
  ListEmptyComponent?: React.ReactNode;
  estimatedItemSize?: number;
  numColumns?: number;
  contentContainerStyle?: any;
}

export function InfiniteList<T>({
  data,
  renderItem,
  onEndReached,
  loading = false,
  ListEmptyComponent,
  estimatedItemSize = 100,
  numColumns = 1,
  contentContainerStyle,
}: InfiniteListProps<T>) {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    list: {
      flex: 1,
    },
    footer: {
      padding: 16,
      alignItems: "center",
    },
  });

  return (
    <FlashList
      data={data}
      renderItem={renderItem}
      estimatedItemSize={estimatedItemSize}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      numColumns={numColumns}
      ListEmptyComponent={ListEmptyComponent}
      ListFooterComponent={
        loading ? (
          <View style={styles.footer}>
            <ActivityIndicator color={theme.primary} />
          </View>
        ) : null
      }
      contentContainerStyle={contentContainerStyle}
    />
  );
}
