import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  BackHandler,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BookingDetailsCard } from '@/components/booking-details-card';
import { NoteEditor } from '@/components/note-editor';
import { BackButton } from '@/components/ui/back-button';
import { Button } from '@/components/ui/button';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { StateMessage } from '@/components/ui/state-message';
import { Fonts, MaxContentWidth, Spacing } from '@/constants/theme';
import { useBooking } from '@/hooks/use-booking';
import { useBookingNote } from '@/hooks/use-booking-note';
import { useTheme } from '@/hooks/use-theme';
import { canCheckIn } from '@/lib/check-in';

export default function BookingDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors } = useTheme();

  const { booking, isLoading, error, reload } = useBooking(id);
  const [isCheckedIn, setIsCheckedIn] = useState<boolean>(false);
  const [now, setNow] = useState<Date>(() => new Date());
  const [showExitDialog, setShowExitDialog] = useState<boolean>(false);
  const scrollViewRef = useRef<React.ElementRef<typeof ScrollView>>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, []);

  // Ensure note field and Save note stay visible on screen when keyboard opens
  useEffect(() => {
    const showEvent =
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const subscription = Keyboard.addListener(showEvent, scrollToBottom);
    return () => subscription.remove();
  }, [scrollToBottom]);

  const {
    note,
    setNote,
    statusMessage,
    statusType,
    hasUnsavedChanges,
    saveNote,
  } = useBookingNote(id ?? '');

  // Intercept Android hardware back button when unsaved changes exist
  useEffect(() => {
    const onBackPress = () => {
      if (hasUnsavedChanges) {
        setShowExitDialog(true);
        return true;
      }
      return false;
    };

    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress
    );
    return () => subscription.remove();
  }, [hasUnsavedChanges]);

  const handleBack = () => {
    if (hasUnsavedChanges) {
      setShowExitDialog(true);
    } else {
      router.back();
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView
        edges={['top', 'bottom', 'left', 'right']}
        style={[styles.safeArea, { backgroundColor: colors.background }]}>
        <StateMessage type="loading" message="Loading booking details..." />
      </SafeAreaView>
    );
  }

  if (error || !booking) {
    return (
      <SafeAreaView
        edges={['top', 'bottom', 'left', 'right']}
        style={[styles.safeArea, { backgroundColor: colors.background }]}>
        <View style={styles.navigationBar}>
          <BackButton />
        </View>
        <StateMessage
          type="error"
          message={error ?? 'Booking not found'}
          onRetry={reload}
        />
      </SafeAreaView>
    );
  }

  const startsAtDate = new Date(booking.startsAt);
  const checkInAllowed = canCheckIn(now, startsAtDate);

  return (
    <SafeAreaView
      edges={['top', 'bottom', 'left', 'right']}
      style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoider}
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 16 : 0}>
        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          automaticallyAdjustKeyboardInsets={true}
          showsVerticalScrollIndicator={false}>
          <View style={styles.innerContainer}>
            <View style={styles.navigationBar}>
              <BackButton onPress={handleBack} />
            </View>

            <View style={styles.mainHeader}>
              <Text style={[styles.title, { color: colors.text }]}>
                {booking.title}
              </Text>
              <BookingDetailsCard
                startsAt={booking.startsAt}
                timezone={booking.timezone}
              />
            </View>

            <View style={styles.checkInSection}>
              <Button
                label={isCheckedIn ? 'Checked in' : 'Check in'}
                variant={isCheckedIn ? 'success' : 'primary'}
                icon={({ color, size }) => (
                  <Ionicons
                    name={
                      isCheckedIn
                        ? 'checkmark-circle'
                        : 'checkmark-circle-outline'
                    }
                    size={size}
                    color={color}
                  />
                )}
                disabled={!checkInAllowed || isCheckedIn}
                onPress={() => setIsCheckedIn(true)}
              />
              {!checkInAllowed && (
                <Text style={[styles.helpText, { color: colors.textMuted }]}>
                  Check in is available 15 minutes before start.
                </Text>
              )}
            </View>

            <NoteEditor
              note={note}
              onChangeNote={setNote}
              statusMessage={statusMessage}
              statusType={statusType}
              onSave={saveNote}
              onFocus={scrollToBottom}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <ConfirmDialog
        visible={showExitDialog}
        title="Unsaved changes"
        message="You have unsaved changes in your note. Are you sure you want to discard them?"
        confirmLabel="Discard"
        cancelLabel="Keep editing"
        onConfirm={() => {
          setShowExitDialog(false);
          router.back();
        }}
        onCancel={() => setShowExitDialog(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  keyboardAvoider: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.two,
    paddingBottom: Spacing.six + 16,
    flexGrow: 1,
  },
  innerContainer: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    gap: Spacing.four,
  },
  navigationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.two,
  },
  mainHeader: {
    gap: Spacing.three,
  },
  title: {
    fontSize: 28,
    fontFamily: Fonts.sans,
    fontWeight: '700',
    letterSpacing: -0.6,
  },
  checkInSection: {
    gap: Spacing.two,
  },
  helpText: {
    fontSize: 13,
    fontFamily: Fonts.sans,
    textAlign: 'center',
  },
});
