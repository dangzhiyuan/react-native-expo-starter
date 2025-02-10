import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Text } from "../Text/Text";
import { Skeleton, SkeletonGroup } from "../Skeleton/Skeleton";
import { useTheme } from "../../themes/ThemeProvider";
import { useResponsive } from "../../utils/responsive";

interface PostData {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
}

interface PostCardProps {
  data?: PostData;
  loading?: boolean;
}

export const PostCard = ({ data, loading = false }: PostCardProps) => {
  const { theme } = useTheme();
  const { layout } = useResponsive();

  const styles = StyleSheet.create({
    card: {
      backgroundColor: theme.surface,
      borderRadius: 12,
      padding: layout.padding,
      marginBottom: layout.gutter,
      shadowColor: theme.text.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: layout.gutter,
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: layout.gutter,
    },
    content: {
      marginTop: layout.gutter,
    },
  });

  if (loading) {
    return (
      <View style={styles.card}>
        <View style={styles.header}>
          <SkeletonGroup.Avatar size={40} />
          <View style={{ marginLeft: layout.gutter, flex: 1 }}>
            <Skeleton width={120} height={16} />
          </View>
        </View>
        <SkeletonGroup.Text lines={3} spacing={8} />
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image source={{ uri: data?.author.avatar }} style={styles.avatar} />
        <Text variant="body">{data?.author.name}</Text>
      </View>
      <Text variant="h3">{data?.title}</Text>
      <Text variant="body" style={styles.content}>
        {data?.content}
      </Text>
    </View>
  );
};
