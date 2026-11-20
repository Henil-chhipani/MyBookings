import { router } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Booking } from '@/api/types';
import { BookingCard } from '@/components/ui/booking-card';
import { SearchBar } from '@/components/ui/search-bar';
import { StateMessage } from '@/components/ui/state-message';
import { Fonts, MaxContentWidth, Spacing } from '@/constants/theme';
import { useBookings } from '@/hooks/use-bookings';
import { useTheme } from '@/hooks/use-theme';

export default function BookingsListScreen() {
  const { colors } = useTheme();
  const {
    bookings,
    isLoading,
    isRefreshing,
    error,
    lastUpdated,
    refresh,
    retry,
  } = useBookings();

  const [searchQuery, setSearchQuery] = useState('');

  // Filter bookings by title (case-insensitive)
  const filteredBookings = useMemo(() => {
    const trimmed = searchQuery.trim().toLowerCase();
    if (!trimmed) return bookings;
    return bookings.filter((b) => b.title.toLowerCase().includes(trimmed));
  }, [bookings, searchQuery]);

  const renderEmptyComponent = () => {
    if (isLoading) {
      return <StateMessage type="loading" message="Loading bookings..." />;
    }

    if (error) {
      return (
        <StateMessage
          type="error"
          message="Could not load bookings"
          onRetry={retry}
        />
      );
    }

    // If bookings array is empty from the API
    if (bookings.length === 0) {
      return <StateMessage type="empty" message="No bookings" />;
    }

    // If bookings exist but search returned 0 matches
    if (filteredBookings.length === 0) {
      return <StateMessage type="empty" message="No bookings match" />;
    }

    return null;
  };

  const renderBookingItem = ({ item }: { item: Booking }) => (
    <BookingCard
      booking={item}
      onPress={() => router.push(`/bookings/${item.id}`)}
    />
  );

  return (
    <SafeAreaView
      edges={['top', 'bottom', 'left', 'right']}
      style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={styles.innerContainer}>
        {/* Header & Search fixed above the list to prevent unmounting & keyboard dismissal */}
        <View style={styles.headerContainer}>
          <View style={styles.topRow}>
            <Text style={[styles.screenTitle, { color: colors.text }]}>Bookings</Text>
            {lastUpdated ? (
              <Text style={[styles.updatedText, { color: colors.textMuted }]}>
                Updated {lastUpdated}
              </Text>
            ) : null}
          </View>

          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search bookings"
          />
        </View>

        <FlatList
          data={error || isLoading ? [] : filteredBookings}
          keyExtractor={(item) => item.id}
          renderItem={renderBookingItem}
          ListEmptyComponent={renderEmptyComponent}
          contentContainerStyle={styles.listContent}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={refresh}
              tintColor={colors.textSecondary}
              colors={[colors.primary]}
            />
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  headerContainer: {
    gap: Spacing.three,
    paddingHorizontal: Spacing.four,
    paddingTop: Platform.OS === 'ios' ? Spacing.one : Spacing.two,
    paddingBottom: Spacing.three,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  screenTitle: {
    fontSize: 28,
    fontFamily: Fonts.sans,
    fontWeight: '700',
    letterSpacing: -0.6,
  },
  updatedText: {
    fontSize: 12,
    fontFamily: Fonts.sans,
    fontWeight: '400',
  },
  listContent: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.one,
    paddingBottom: Spacing.six,
    flexGrow: 1,
  },
  separator: {
    height: Spacing.three,
  },
});
