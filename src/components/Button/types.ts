import { StyleProp, ViewStyle, TextStyle, TextProps } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "error"
  | "text"
  | "success"
  | "warning";

export interface ButtonProps {
  title: string;
  variant?: ButtonVariant;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  textProps?: Partial<TextProps>;
  leftIcon?: keyof typeof MaterialIcons.glyphMap;
  rightIcon?: keyof typeof MaterialIcons.glyphMap;
  iconSize?: number;
  iconColor?: string;
  loadingColor?: string;
  activeOpacity?: number;
}
