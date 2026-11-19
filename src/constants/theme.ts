import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#09090B',
    textSecondary: '#52525B',
    textMuted: '#71717A',
    background: '#FAFAFA',
    surface: '#FFFFFF',
    surfaceSubtle: '#F4F4F5',
    backgroundElement: '#F0F0F3',
    backgroundSelected: '#E0E1E6',
    border: '#E4E4E7',
    borderSubtle: '#F4F4F5',
    primary: '#18181B',
    primaryText: '#FFFFFF',
    accent: '#2563EB',
    success: '#16A34A',
    successSurface: '#F0FDF4',
    error: '#DC2626',
    errorSurface: '#FEF2F2',
    disabled: '#E4E4E7',
    disabledText: '#A1A1AA',
    inputBackground: '#FFFFFF',
    inputBorder: '#D4D4D8',
    inputBorderFocus: '#18181B',
    badgeBackground: '#F4F4F5',
    badgeText: '#3F3F46',
  },
  dark: {
    text: '#F4F4F5',
    textSecondary: '#A1A1AA',
    textMuted: '#71717A',
    background: '#09090B',
    surface: '#141416',
    surfaceSubtle: '#1E1E22',
    backgroundElement: '#212225',
    backgroundSelected: '#2E3135',
    border: '#27272A',
    borderSubtle: '#1C1C1F',
    primary: '#EDEDEF',
    primaryText: '#09090B',
    accent: '#3B82F6',
    success: '#22C55E',
    successSurface: '#052E16',
    error: '#EF4444',
    errorSurface: '#450A0A',
    disabled: '#27272A',
    disabledText: '#52525B',
    inputBackground: '#141416',
    inputBorder: '#3F3F46',
    inputBorderFocus: '#EDEDEF',
    badgeBackground: '#1E1E22',
    badgeText: '#D4D4D8',
  },
};

export type ThemeColor = keyof typeof Colors.light;
export type ThemeColors = Record<ThemeColor, string>;
export type ThemeMode = keyof typeof Colors;

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)',
    serif: 'var(--font-serif, Georgia, serif)',
    rounded: 'var(--font-rounded, sans-serif)',
    mono: 'var(--font-mono, "SF Mono", Menlo, Consolas, Monaco, monospace)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const Radius = {
  sm: 6,
  md: 10,
  lg: 14,
  full: 9999,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 720;
