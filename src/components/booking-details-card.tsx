import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Fonts, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { formatBookingDate, formatBookingTime } from '@/lib/date-format';

export interface BookingDetailsCardProps {
  startsAt: string;
  timezone: string;
}

export function BookingDetailsCard({
  startsAt,
  timezone,
}: BookingDetailsCardProps) {
  const { colors } = useTheme();
  const calendarDate = formatBookingDate(startsAt, timezone);
  const localTime = formatBookingTime(startsAt, timezone);

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
      ]}>
      <View style={styles.row}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>Date</Text>
        <Text style={[styles.value, { color: colors.text }]}>{calendarDate}</Text>
      </View>

      <View style={[styles.divider, { backgroundColor: colors.borderSubtle }]} />

      <View style={styles.row}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>
          Local Time
        </Text>
        <Text style={[styles.value, { color: colors.text }]}>{localTime}</Text>
      </View>

      <View style={[styles.divider, { backgroundColor: colors.borderSubtle }]} />

      <View style={styles.row}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>
          Timezone
        </Text>
        <View
          style={[
            styles.badge,
            {
              backgroundColor: colors.badgeBackground,
              borderColor: colors.borderSubtle,
            },
          ]}>
          <Text style={[styles.badgeText, { color: colors.badgeText }]}>
            {timezone}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.lg,
    borderWidth: 1,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.two,
  },
  label: {
    fontSize: 14,
    fontFamily: Fonts.sans,
    fontWeight: '400',
  },
  value: {
    fontSize: 15,
    fontFamily: Fonts.sans,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  divider: {
    height: 1,
    width: '100%',
  },
  badge: {
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.two + 2,
    paddingVertical: Spacing.half,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 12,
    fontFamily: Fonts.mono,
    fontWeight: '500',
  },
});
