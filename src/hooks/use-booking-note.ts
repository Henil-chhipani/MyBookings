import { useCallback, useEffect, useState } from 'react';
import { validateNoteInput } from '@/lib/note-validation';
import { getBookingNote, saveBookingNote } from '@/lib/storage';

export type NoteStatusType = 'idle' | 'success' | 'error';

export function useBookingNote(bookingId: string) {
  const [note, setNote] = useState<string>('');
  const [savedNote, setSavedNote] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<NoteStatusType>('idle');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load existing note on mount or when bookingId changes
  useEffect(() => {
    let isMounted = true;

    getBookingNote(bookingId)
      .then((existing) => {
        if (isMounted) {
          setNote(existing);
          setSavedNote(existing);
          setStatusMessage(null);
          setStatusType('idle');
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
    setStatusMessage(null);
    setStatusType('idle');
  }, []);

  const handleSave = useCallback(async (): Promise<boolean> => {
    const validation = validateNoteInput(note);

    if (!validation.valid) {
      setStatusMessage(validation.message);
      setStatusType('error');
      return false;
    }

    try {
      await saveBookingNote(bookingId, note);
      setSavedNote(note);
      setStatusMessage(validation.message);
      setStatusType('success');
      return true;
    } catch {
      setStatusMessage('Enter a note');
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
    hasUnsavedChanges: !isLoading && note !== savedNote,
    saveNote: handleSave,
  };
}
