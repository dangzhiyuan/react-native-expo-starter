import { useBreakpoint } from './useBreakpoint';

type ResponsiveValue<T> = {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  base: T;
};

export const useResponsiveValue = <T>(values: ResponsiveValue<T>): T => {
  const { breakpoint } = useBreakpoint();
  const breakpoints = ['xl', 'lg', 'md', 'sm', 'xs'] as const;

  // 从当前断点开始，找到第一个定义的值
  for (const bp of breakpoints) {
    if (breakpoint === bp && values[bp] !== undefined) {
      return values[bp]!;
    }
  }

  return values.base;
}; 