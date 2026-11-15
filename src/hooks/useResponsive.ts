import { useWindowDimensions } from 'react-native';
import { tokens } from '../design/tokens';

export function useResponsive() {
  const { width } = useWindowDimensions();
  return {
    isCompact: width < tokens.breakpoint.compact,
    isWide: width >= tokens.breakpoint.wide,
  };
}
