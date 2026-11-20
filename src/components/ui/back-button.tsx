import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Radius } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export interface BackButtonProps {
  onPress?: () => void;
}

export function BackButton({ onPress }: BackButtonProps) {
  const { colors } = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Back to bookings"
      accessibilityHint="Returns to the bookings list"
      onPress={onPress ?? (() => router.back())}
      hitSlop={8}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          opacity: pressed ? 0.7 : 1,
        },
      ]}>
      <Ionicons
        name="chevron-back"
        size={22}
        color={colors.text}
        style={styles.chevronIcon}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: Radius.full,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevronIcon: {
    marginRight: 2,
  },
});
