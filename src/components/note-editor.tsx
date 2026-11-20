import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from '@/components/ui/button';
import { Fonts, Radius, Spacing } from '@/constants/theme';
import { NoteStatusType } from '@/hooks/use-booking-note';
import { useTheme } from '@/hooks/use-theme';

export interface NoteEditorProps {
  note: string;
  onChangeNote: (text: string) => void;
  statusMessage: string | null;
  statusType: NoteStatusType;
  onSave: () => void;
}

export function NoteEditor({
  note,
  onChangeNote,
  statusMessage,
  statusType,
  onSave,
}: NoteEditorProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={[styles.label, { color: colors.text }]}>Note</Text>
        <Text
          style={[
            styles.counter,
            {
              color: note.length > 140 ? colors.error : colors.textMuted,
            },
          ]}>
          {note.length}/140
        </Text>
      </View>

      <TextInput
        accessibilityLabel="Note"
        style={[
          styles.input,
          {
            backgroundColor: colors.surface,
            borderColor: statusType === 'error' ? colors.error : colors.border,
            color: colors.text,
          },
        ]}
        placeholder="Add a note for this booking..."
        placeholderTextColor={colors.textMuted}
        value={note}
        onChangeText={onChangeNote}
        multiline
        numberOfLines={3}
        textAlignVertical="top"
      />

      {statusMessage ? (
        <View style={styles.statusRow}>
          <Text
            style={[
              styles.statusText,
              {
                color: statusType === 'error' ? colors.error : colors.success,
              },
            ]}>
            {statusMessage}
          </Text>
        </View>
      ) : null}

      <Button
        label="Save note"
        variant="primary"
        icon={({ color, size }) => (
          <Ionicons name="bookmark-outline" size={size} color={color} />
        )}
        onPress={onSave}
        style={styles.saveButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.two,
    marginTop: Spacing.two,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
    fontFamily: Fonts.sans,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  counter: {
    fontSize: 12,
    fontFamily: Fonts.mono,
  },
  input: {
    minHeight: 88,
    borderRadius: Radius.md,
    borderWidth: 1,
    padding: Spacing.three,
    fontSize: 15,
    fontFamily: Fonts.sans,
  },
  statusRow: {
    paddingVertical: Spacing.half,
  },
  statusText: {
    fontSize: 13,
    fontFamily: Fonts.sans,
    fontWeight: '500',
  },
  saveButton: {
    marginTop: Spacing.one,
  },
});
