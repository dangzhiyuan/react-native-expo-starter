import React from 'react';
import { View } from 'react-native';
import { useResponsive } from '../../utils/responsive';

interface Props {
  size?: number;
  horizontal?: boolean;
}

export const Spacer = ({ size, horizontal = false }: Props) => {
  const { layout } = useResponsive();
  const spacing = size ?? layout.gutter;

  return (
    <View
      style={
        horizontal
          ? { width: spacing }
          : { height: spacing }
      }
    />
  );
}; 