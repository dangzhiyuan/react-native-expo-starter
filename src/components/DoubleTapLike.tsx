import React from "react";
import { TouchableWithoutFeedback, Animated } from "react-native";

interface Props {
  onDoubleTap: () => void;
  children: React.ReactNode;
}

export const DoubleTapLike: React.FC<Props> = ({ onDoubleTap, children }) => {
  const lastTap = React.useRef(0);
  const scale = React.useRef(new Animated.Value(1)).current;

  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;

    if (now - lastTap.current < DOUBLE_TAP_DELAY) {
      Animated.sequence([
        Animated.spring(scale, {
          toValue: 1.2,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
        }),
      ]).start();

      onDoubleTap();
    }
    lastTap.current = now;
  };

  return (
    <TouchableWithoutFeedback onPress={handleDoubleTap}>
      <Animated.View style={{ transform: [{ scale }] }}>
        {children}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};
