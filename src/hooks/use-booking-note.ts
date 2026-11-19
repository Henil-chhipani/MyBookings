import { useCallback, useEffect, useState } from 'react';
import { getBookingNote, saveBookingNote } from '@/lib/storage';

export type NoteStatusType = 'idle' | 'success' | 'error';

export function useBookingNote(bookingId: string) {
  const [note, setNote] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<NoteStatusType>('idle');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load existing note on mount or when bookingId changes
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setStatusMessage(null);
    setStatusType('idle');

    getBookingNote(bookingId)
      .then((savedNote) => {
        if (isMounted) {
          setNote(savedNote);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [bookingId]);

  const handleTextChange = useCallback((text: string) => {
    setNote(text);
    // Clear status message when user edits
    setStatusMessage(null);
    setStatusType('idle');
  }, []);

  const handleSave = useCallback(async (): Promise<boolean> => {
    const trimmed = note.trim();

    if (trimmed.length === 0) {
      setStatusMessage('Enter a note');
      setStatusType('error');
      return false;
    }

    if (note.length > 140) {
      setStatusMessage('Keep the note under 140 characters');
      setStatusType('error');
      return false;
    }

    try {
      await saveBookingNote(bookingId, note);
      setStatusMessage('Note saved');
      setStatusType('success');
      return true;
    } catch {
      setStatusMessage('Failed to save note');
      setStatusType('error');
      return false;
    }
  }, [bookingId, note]);

  return {
    note,
    setNote: handleTextChange,
    statusMessage,
    statusType,
    isLoading,
    saveNote: handleSave,
  };
}
