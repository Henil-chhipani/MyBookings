import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Fonts, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChangeText,
  placeholder = 'Search bookings',
}: SearchBarProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.textSecondary }]}>
        Search bookings
      </Text>
      <View
        style={[
          styles.inputWrapper,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
          },
        ]}>
        <TextInput
          accessibilityLabel="Search bookings"
          accessibilityRole="search"
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          value={value}
          onChangeText={onChangeText}
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="while-editing"
          style={[
            styles.input,
            {
              color: colors.text,
            },
          ]}
        />
        {value.length > 0 && (
          <Pressable
            accessibilityLabel="Clear search"
            accessibilityRole="button"
            onPress={() => onChangeText('')}
            hitSlop={8}
            style={({ pressed }) => [
              styles.clearButton,
              {
                backgroundColor: colors.surfaceSubtle,
                opacity: pressed ? 0.7 : 1,
              },
            ]}>
            <Text style={[styles.clearText, { color: colors.textMuted }]}>✕</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.one,
  },
  label: {
    fontSize: 13,
    fontFamily: Fonts.sans,
    fontWeight: '500',
    letterSpacing: -0.1,
  },
  inputWrapper: {
    height: 44,
    borderRadius: Radius.md,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.three,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 15,
    fontFamily: Fonts.sans,
    paddingVertical: 0,
  },
  clearButton: {
    width: 22,
    height: 22,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Spacing.two,
  },
  clearText: {
    fontSize: 11,
    fontWeight: '700',
  },
});
