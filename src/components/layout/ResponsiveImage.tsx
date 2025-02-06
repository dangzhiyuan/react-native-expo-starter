import React from 'react';
import { Image, ImageStyle, StyleSheet } from 'react-native';
import { useResponsive } from '../../utils/responsive';

interface Props {
  source: number | { uri: string };
  aspectRatio?: number;
  maxWidth?: number;
  style?: ImageStyle;
}

export const ResponsiveImage = ({ 
  source, 
  aspectRatio = 1, 
  maxWidth,
  style 
}: Props) => {
  const { width: screenWidth } = useResponsive();
  const imageWidth = maxWidth ? Math.min(screenWidth, maxWidth) : screenWidth;

  const styles = StyleSheet.create({
    image: {
      width: imageWidth,
      height: imageWidth / aspectRatio,
    },
  });

  return (
    <Image
      source={source}
      style={[styles.image, style]}
      resizeMode="cover"
    />
  );
}; 