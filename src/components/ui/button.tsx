import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';
import { Fonts, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export interface ButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
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
  style,
  testID,
  accessibilityLabel,
}: ButtonProps) {
  const { colors } = useTheme();

  const isInteractive = !disabled && !loading;

  const getBackgroundColor = (pressed: boolean) => {
    if (disabled) return colors.disabled;
    if (variant === 'primary') {
      return pressed ? colors.primaryText === '#FFFFFF' ? '#27272A' : '#D4D4D8' : colors.primary;
    }
    if (variant === 'secondary') {
      return pressed ? colors.border : colors.surfaceSubtle;
    }
    return pressed ? colors.surfaceSubtle : 'transparent';
  };

  const getTextColor = () => {
    if (disabled) return colors.disabledText;
    if (variant === 'primary') return colors.primaryText;
    return colors.text;
  };

  const getBorderColor = () => {
    if (disabled) return 'transparent';
    if (variant === 'outline') return colors.border;
    return 'transparent';
  };

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
          borderWidth: variant === 'outline' ? 1 : 0,
          opacity: pressed ? 0.9 : 1,
        },
        style,
      ]}>
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? colors.primaryText : colors.text}
        />
      ) : (
        <Text style={[styles.label, { color: getTextColor() }]}>{label}</Text>
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
    flexDirection: 'row',
  },
  label: {
    fontSize: 15,
    fontFamily: Fonts.sans,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
});
