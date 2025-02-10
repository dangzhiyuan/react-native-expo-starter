import React from "react";
import { Image, View, StyleSheet } from "react-native";
import { Text } from "../Text/Text";
import { useTheme } from "../../themes/ThemeProvider";

interface AvatarProps {
  source?: { uri: string };
  name?: string;
  size?: number;
  shape?: "circle" | "square";
}

export const Avatar = ({
  source,
  name,
  size = 40,
  shape = "circle",
}: AvatarProps) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      width: size,
      height: size,
      borderRadius: shape === "circle" ? size / 2 : size / 6,
      backgroundColor: theme.primary,
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    },
    image: {
      width: "100%",
      height: "100%",
    },
    text: {
      color: theme.text.inverse,
      fontSize: size / 2.5,
    },
  });

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <View style={styles.container}>
      {source ? (
        <Image source={source} style={styles.image} />
      ) : (
        name && (
          <Text style={styles.text} variant="body">
            {getInitials(name)}
          </Text>
        )
      )}
    </View>
  );
};
