# MyBookings 📱

A mobile application built with **Expo**, **Expo Router**, **React Native**, and **TypeScript**. Features a dynamic minimal design system (with system light/dark mode adaptation), timezone-aware date formatting, device-backed note persistence, safe area containment, and 100% automated test coverage runnable without a device.

---

## 📋 Project Specifications

- **Expo SDK**: `58` (`~58.0.26`)
- **React Native**: `0.88.1` (React `19.3.0`)
- **Routing**: Expo Router (File-based routing with native `Stack` navigator)
- **Local Store**: `@react-native-async-storage/async-storage`
- **Testing**: Jest with `jest-expo` preset (100% device-free)
- **Icons**: `@expo/vector-icons` (`Ionicons`)

---
##  Drive Video link:

- [Demo Video](https://drive.google.com/file/d/1UTtlErxNgoE7fZ5zCwdAadfIMpGwCabw/view)
---
## ⏱️ Development Time

- **Total Time Spent**: **~3.5 – 4 hours**
- **Session Breakdown** (derived from commit history):
  - **Day 1 (Nov 19)**: Initial scaffold, dynamic theme tokens, Jest & AsyncStorage configuration, API client & fake server, check-in logic, and initial test suites (~1.75 hrs).
  - **Day 2 (Nov 20)**: Modular component extraction, keyboard-avoiding scroll container with platform insets, unsaved changes confirmation dialog, strict IANA timezone validation, and code hardening (~1.75 hrs).

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Development Server

```bash
npx expo start
```

From the interactive terminal output:
- Press <kbd>i</kbd> to open in the **iOS Simulator**
- Press <kbd>a</kbd> to open in the **Android Emulator**
- Press <kbd>w</kbd> to open in **Expo Web** (browser)

---

## 🧪 Running Automated Tests

All automated tests run in pure Node without requiring a device or simulator.

### Run All Tests

```bash
npm test
```

### Run Specific Test Suites

You can copy and run either of these directly:

```bash
# 1. Run Check-In Logic tests (≤ 15 minutes rule)
npm test check-in

# 2. Run API Client & filtering tests (broken row skipping, bad timezone skipping, HTTP 500 error)
npm test bookings-api
```

### Run Lint and Typecheck

```bash
# TypeScript compiler check
npm run typecheck

# ESLint check
npx expo lint

# Expo diagnostics
npx expo-doctor
```

---

## 🔄 Simulating API States (Fake Server)

The app talks to an in-app fake server that answers with real `Response` objects. You can simulate different backend responses by starting the app with environment variables:

```bash
# 1. Simulate API 500 Error -> shows "Could not load bookings" & "Try again" button
EXPO_PUBLIC_BOOKINGS=error npx expo start

# 2. Simulate Empty Result -> shows "No bookings"
EXPO_PUBLIC_BOOKINGS=empty npx expo start

# 3. Normal State -> returns 4 bookings (broken row filtered out)
npx expo start
```

---

## 📱 Features & App Architecture

### Screens
- **`/` (List Screen)**:
  - Inside safe area boundaries (`SafeAreaView`).
  - **Search**: Field labelled `Search bookings` filters rows by title case-insensitively (`rev` filters to `Plan review`; unmatched searches display `No bookings match`).
  - **Pull to Refresh**: Pull-down gesture refreshes data and updates the `Updated <time>` line.
  - **Empty / Error States**: Graceful states for empty responses (`No bookings`) and network/server errors (`Could not load bookings` with `Try again`).

- **`/bookings/[id]` (Detail Screen)**:
  - Inside safe area boundaries with a circular, accessible back button.
  - **Details**: Title, calendar date, local time, and IANA timezone ID (e.g. *Studio visit* displays `11:00 AM` in `America/New_York`, *Plan review* displays `3:00 PM` in `Europe/London`).
  - **Check In**: Button calls `canCheckIn(now, startsAt)`. Enabled only 15 minutes before the booking start (or later). When checked in, it smoothly transitions to a clean bordered success badge (`Checked in`).
  - **Note Field & Save Note**:
    - Empty note submit shows `Enter a note` (does not save).
    - Note exceeding 140 characters shows `Keep the note under 140 characters` (does not save).
    - Valid note shows `Note saved` and persists to device storage under `@booking_note_${bookingId}`.
    - Persisted notes are restored when leaving and reopening the booking.
  - **Unsaved Changes Dialog**: An elegant themed confirmation modal appears if the user edits a note and attempts to navigate back without saving.
  - **Keyboard Avoidance**: Uses `automaticallyAdjustKeyboardInsets` and auto-scrolling so both the Note input and the `Save note` button remain visible on screen while the keyboard is open.


---

## 🤖 AI Tools & Development Workflow

This project was developed leveraging a dual-model AI pair-programming workflow:

- **Antigravity IDE (Gemini)**: Served as the primary coding and implementation assistant — handled initial project scaffolding, step-by-step modular code generation (fake API server, state hooks, screen layouts), and requirements-driven test suites.
- **OpenCode CLI (DeepSeek)**: Served as an independent reviewer — audited code quality, challenged edge cases (e.g., timezone validation, API decoupling, test fidelity), and provided review feedback.

### Key Highlights & Problem Solving

1. **Phase-by-Phase Development**:
   - Initialized the base Expo project and dynamic theme system.
   - Built the pure API client and in-app fake server responding with real `Response` objects.
   - Constructed the UI states (loading, empty, error, and list/detail screens) with safe area boundaries.
   - Wrote automated device-free test suites matching requirements.

2. **Real-Device Keyboard UX Challenge**:
   - During early real-device testing, opening the software keyboard pushed the note input and "Save note" action out of view.
   - By reviewing the behavior and steering the implementation, a combination of `KeyboardAvoidingView` (with platform padding), `automaticallyAdjustKeyboardInsets`, and programmatic auto-scroll on focus was implemented so the entire note editing area remains cleanly visible above the keyboard.

3. **Minimalist Adaptive Design**:
   - Selected a clean, distraction-free monochrome design palette (black & white with subtle border accents).
   - Fully reactive to the system's light/dark mode preference with zero flash on app startup.


