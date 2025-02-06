import { useState, useEffect } from 'react';
import { Dimensions, ScaledSize } from 'react-native';
import { useResponsive } from '../utils/responsive';

export const useLayout = () => {
  const { width, height, device } = useResponsive();
  const [orientation, setOrientation] = useState({
    isPortrait: height > width,
    isLandscape: width > height,
  });

  useEffect(() => {
    const onChange = ({ window: { width, height } }: { window: ScaledSize }) => {
      setOrientation({
        isPortrait: height > width,
        isLandscape: width > height,
      });
    };

    const subscription = Dimensions.addEventListener('change', onChange);
    return () => subscription.remove();
  }, []);

  return {
    width,
    height,
    ...orientation,
    device,
    isPhone: device === 'phone',
    isTablet: device === 'tablet',
    isDesktop: device === 'desktop',
  };
}; 