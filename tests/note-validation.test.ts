import { getNoteStorageKey } from '../src/lib/storage';

export function validateNoteInput(note: string): {
  valid: boolean;
  message?: string;
} {
  const trimmed = note.trim();
  if (trimmed.length === 0) {
    return { valid: false, message: 'Enter a note' };
  }
  if (note.length > 140) {
    return { valid: false, message: 'Keep the note under 140 characters' };
  }
  return { valid: true, message: 'Note saved' };
}

describe('Note validation rules', () => {
  it('stores note under key that includes booking id', () => {
    expect(getNoteStorageKey('studio')).toBe('@booking_note_studio');
    expect(getNoteStorageKey('xyz-123')).toBe('@booking_note_xyz-123');
  });

  it('rejects empty input with "Enter a note"', () => {
    expect(validateNoteInput('')).toEqual({
      valid: false,
      message: 'Enter a note',
    });
    expect(validateNoteInput('   ')).toEqual({
      valid: false,
      message: 'Enter a note',
    });
  });

  it('rejects input longer than 140 chars with "Keep the note under 140 characters"', () => {
    const longNote = 'a'.repeat(141);
    expect(validateNoteInput(longNote)).toEqual({
      valid: false,
      message: 'Keep the note under 140 characters',
    });
  });

  it('accepts valid input up to 140 chars with "Note saved"', () => {
    const validNote = 'a'.repeat(140);
    expect(validateNoteInput(validNote)).toEqual({
      valid: true,
      message: 'Note saved',
    });

    const shortNote = 'Bring sample blueprints';
    expect(validateNoteInput(shortNote)).toEqual({
      valid: true,
      message: 'Note saved',
    });
  });
});
