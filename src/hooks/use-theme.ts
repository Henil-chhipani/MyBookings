import { Colors, ThemeColor, ThemeColors, ThemeMode } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function useTheme(): ThemeColors & {
  colors: ThemeColors;
  mode: ThemeMode;
  isDark: boolean;
} {
  const scheme = useColorScheme();
  const mode: ThemeMode = scheme === 'dark' ? 'dark' : 'light';
  const colors: ThemeColors = Colors[mode];

  return {
    ...colors,
    colors,
    mode,
    isDark: mode === 'dark',
  };
}
