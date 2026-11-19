import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Fonts, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { Button } from './button';

export interface StateMessageProps {
  type: 'loading' | 'empty' | 'error';
  message: string;
  onRetry?: () => void;
}

export function StateMessage({ type, message, onRetry }: StateMessageProps) {
  const { colors } = useTheme();

  if (type === 'loading') {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.loadingText, { color: colors.textMuted }]}>
          {message}
        </Text>
      </View>
    );
  }

  if (type === 'error') {
    return (
      <View style={styles.container}>
        <View
          style={[
            styles.iconCircle,
            { backgroundColor: colors.errorSurface, borderColor: colors.border },
          ]}>
          <Text style={[styles.errorIcon, { color: colors.error }]}>!</Text>
        </View>
        <Text style={[styles.title, { color: colors.text }]}>{message}</Text>
        {onRetry && (
          <Button
            label="Try again"
            onPress={onRetry}
            style={styles.retryButton}
          />
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.textSecondary }]}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.six,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.three,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorIcon: {
    fontSize: 22,
    fontWeight: '700',
  },
  loadingText: {
    fontSize: 14,
    fontFamily: Fonts.sans,
    marginTop: Spacing.two,
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.sans,
    fontWeight: '500',
    textAlign: 'center',
  },
  retryButton: {
    marginTop: Spacing.two,
    minWidth: 140,
  },
});
