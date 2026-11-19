import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Booking } from '@/api/types';
import { Fonts, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { formatBookingDate, formatBookingTime } from '@/lib/date-format';

export interface BookingCardProps {
  booking: Booking;
  onPress: () => void;
}

export function BookingCard({ booking, onPress }: BookingCardProps) {
  const { colors } = useTheme();

  const formattedDate = formatBookingDate(booking.startsAt, booking.timezone);
  const formattedTime = formatBookingTime(booking.startsAt, booking.timezone);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Booking ${booking.title}`}
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          opacity: pressed ? 0.85 : 1,
        },
      ]}>
      <View style={styles.headerRow}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
          {booking.title}
        </Text>
        <Text style={[styles.arrow, { color: colors.textMuted }]}>›</Text>
      </View>

      <View style={styles.metaRow}>
        <Text style={[styles.dateText, { color: colors.textSecondary }]}>
          {formattedDate} • {formattedTime}
        </Text>
      </View>

      <View style={styles.footerRow}>
        <View
          style={[
            styles.badge,
            {
              backgroundColor: colors.badgeBackground,
              borderColor: colors.borderSubtle,
            },
          ]}>
          <Text style={[styles.badgeText, { color: colors.badgeText }]}>
            {booking.timezone}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.lg,
    borderWidth: 1,
    padding: Spacing.four,
    gap: Spacing.two,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontFamily: Fonts.sans,
    fontWeight: '600',
    letterSpacing: -0.3,
    flex: 1,
    paddingRight: Spacing.two,
  },
  arrow: {
    fontSize: 22,
    fontWeight: '300',
    lineHeight: 22,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 14,
    fontFamily: Fonts.sans,
    fontWeight: '400',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.one,
  },
  badge: {
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.two + 2,
    paddingVertical: Spacing.half,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 12,
    fontFamily: Fonts.mono,
    fontWeight: '500',
    letterSpacing: -0.2,
  },
});
