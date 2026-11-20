export interface NoteValidationResult {
  valid: boolean;
  message: 'Enter a note' | 'Keep the note under 140 characters' | 'Note saved';
}

export function validateNoteInput(note: string): NoteValidationResult {
  const trimmed = note.trim();
  if (trimmed.length === 0) {
    return { valid: false, message: 'Enter a note' };
  }
  if (note.length > 140) {
    return { valid: false, message: 'Keep the note under 140 characters' };
  }
  return { valid: true, message: 'Note saved' };
}
