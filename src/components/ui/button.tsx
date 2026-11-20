import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { Fonts, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export interface ButtonIconProps {
  color: string;
  size: number;
}

export interface ButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'accent' | 'success';
  icon?: React.ReactNode | ((props: ButtonIconProps) => React.ReactNode);
  iconPosition?: 'left' | 'right';
  style?: StyleProp<ViewStyle>;
  testID?: string;
  accessibilityLabel?: string;
}

export function Button({
  label,
  onPress,
  disabled = false,
  loading = false,
  variant = 'primary',
  icon,
  iconPosition = 'left',
  style,
  testID,
  accessibilityLabel,
}: ButtonProps) {
  const { colors, isDark } = useTheme();

  const isInteractive = !disabled && !loading;

  const getBackgroundColor = (pressed: boolean) => {
    if (variant === 'success') {
      return pressed
        ? isDark
          ? 'rgba(34, 197, 94, 0.16)'
          : 'rgba(22, 163, 74, 0.14)'
        : isDark
        ? 'rgba(34, 197, 94, 0.08)'
        : 'rgba(22, 163, 74, 0.06)';
    }
    if (disabled) return colors.disabled;
    if (variant === 'primary') {
      return pressed
        ? isDark
          ? '#D4D4D8'
          : '#27272A'
        : colors.primary;
    }
    if (variant === 'accent') {
      return pressed
        ? isDark
          ? '#2563EB'
          : '#1D4ED8'
        : colors.accent;
    }
    if (variant === 'secondary') {
      return pressed
        ? isDark
          ? '#3F3F46'
          : '#D4D4D8'
        : isDark
        ? '#27272A'
        : '#E4E4E7';
    }
    return pressed ? colors.surfaceSubtle : 'transparent';
  };

  const getTextColor = () => {
    if (variant === 'success') return colors.success;
    if (disabled) return colors.disabledText;
    if (variant === 'primary') return colors.primaryText;
    if (variant === 'accent') return '#FFFFFF';
    return colors.text;
  };

  const getBorderColor = () => {
    if (variant === 'success') return colors.success;
    if (disabled) return 'transparent';
    if (variant === 'outline') return colors.border;
    if (variant === 'secondary') return isDark ? '#3F3F46' : '#D4D4D8';
    return 'transparent';
  };

  const textColor = getTextColor();
  const renderedIcon =
    typeof icon === 'function' ? icon({ color: textColor, size: 18 }) : icon;

  const hasBorder =
    variant === 'outline' || variant === 'secondary' || variant === 'success';

  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ disabled: !isInteractive }}
      disabled={!isInteractive}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: getBackgroundColor(pressed),
          borderColor: getBorderColor(),
          borderWidth: hasBorder ? 1.5 : 0,
          opacity: pressed ? 0.9 : 1,
        },
        style,
      ]}>
      {loading ? (
        <ActivityIndicator size="small" color={textColor} />
      ) : (
        <View style={styles.contentRow}>
          {renderedIcon && iconPosition === 'left' && (
            <View style={styles.iconWrapper}>{renderedIcon}</View>
          )}
          <Text style={[styles.label, { color: textColor }]}>{label}</Text>
          {renderedIcon && iconPosition === 'right' && (
            <View style={styles.iconWrapper}>{renderedIcon}</View>
          )}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 15,
    fontFamily: Fonts.sans,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
});
