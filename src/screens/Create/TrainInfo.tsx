import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "@/components/Text/Text";
import { useTheme } from "@/themes/ThemeProvider";
import Button from "@/components/Button/Button";
import { spacing, scale, fontSizes } from "@/utils/responsive";

interface TrainInfoProps {
  currentTrainName: string;
  sceneName: string | null;
  hasChildren: boolean;
  onStartTraining: () => void;
  trainingButtonText: string;
  disabled?: boolean;
  loading?: boolean;
}

const TrainInfo: React.FC<TrainInfoProps> = ({
  currentTrainName,
  sceneName,
  hasChildren,
  onStartTraining,
  trainingButtonText,
  disabled = false,
  loading = false,
}) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.surface,
      borderTopWidth: 1,
      borderTopColor: theme.border,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
    },
    content: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    infoContainer: {
      flex: 1,
      marginRight: spacing.lg,
    },
    trainInfoRow: {
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "wrap",
    },
    trainName: {
      fontSize: fontSizes.h3,
      color: theme.text.primary,
      fontWeight: "600",
    },
    separator: {
      color: theme.text.primary,
      fontSize: fontSizes.h3,
      marginHorizontal: spacing.xs,
      fontWeight: "600",
    },
    button: {
      minWidth: scale(120),
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.infoContainer}>
          <View style={styles.trainInfoRow}>
            <Text style={styles.trainName}>{sceneName || "请选择场景"}</Text>
            {hasChildren && currentTrainName && (
              <>
                <Text style={styles.separator}>-</Text>
                <Text style={styles.trainName}>{currentTrainName}</Text>
              </>
            )}
          </View>
        </View>
        <Button
          title={hasChildren ? trainingButtonText : "开始训练"}
          variant="secondary"
          onPress={onStartTraining}
          disabled={disabled || (!hasChildren ? !sceneName : !currentTrainName)}
          loading={loading}
          style={styles.button}
        />
      </View>
    </View>
  );
};

export default TrainInfo;
