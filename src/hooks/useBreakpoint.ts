import { useResponsive } from '../utils/responsive';

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

export const useBreakpoint = () => {
  const { width } = useResponsive();

  const getBreakpoint = (): Breakpoint => {
    if (width >= breakpoints.xl) return 'xl';
    if (width >= breakpoints.lg) return 'lg';
    if (width >= breakpoints.md) return 'md';
    if (width >= breakpoints.sm) return 'sm';
    return 'xs';
  };

  const up = (breakpoint: Breakpoint) => width >= breakpoints[breakpoint];
  const down = (breakpoint: Breakpoint) => width < breakpoints[breakpoint];
  const between = (start: Breakpoint, end: Breakpoint) => 
    width >= breakpoints[start] && width < breakpoints[end];
  const only = (breakpoint: Breakpoint) => {
    const keys = Object.keys(breakpoints) as Breakpoint[];
    const index = keys.indexOf(breakpoint);
    const nextBreakpoint = keys[index + 1];
    return between(breakpoint, nextBreakpoint || 'xl');
  };

  return {
    breakpoint: getBreakpoint(),
    up,
    down,
    between,
    only,
  };
}; 