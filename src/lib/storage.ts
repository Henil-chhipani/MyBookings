import AsyncStorage from '@react-native-async-storage/async-storage';

export function getNoteStorageKey(bookingId: string): string {
  return `@booking_note_${bookingId}`;
}

export async function getBookingNote(bookingId: string): Promise<string> {
  try {
    const value = await AsyncStorage.getItem(getNoteStorageKey(bookingId));
    return value ?? '';
  } catch (error) {
    console.error(`Failed to load note for booking ${bookingId}:`, error);
    return '';
  }
}

export async function saveBookingNote(
  bookingId: string,
  note: string
): Promise<void> {
  try {
    await AsyncStorage.setItem(getNoteStorageKey(bookingId), note);
  } catch (error) {
    console.error(`Failed to save note for booking ${bookingId}:`, error);
    throw error;
  }
}
