import { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import MoodButton from './components/MoodButton';

const MOODS = [
  { key: 'happy', emoji: '😊', label: 'Happy' },
  { key: 'sad', emoji: '😢', label: 'Sad' },
  { key: 'tired', emoji: '😴', label: 'Tired' },
  { key: 'excited', emoji: '🤩', label: 'Excited' },
];

const INITIAL_COUNTS = { happy: 0, sad: 0, tired: 0, excited: 0 };

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });
  const [counts, setCounts] = useState(INITIAL_COUNTS);

  if (!fontsLoaded) return null;

  const logMood = (key) => {
    setCounts((prev) => ({ ...prev, [key]: prev[key] + 1 }));
  };

  const reset = () => setCounts({ ...INITIAL_COUNTS });

  const values = Object.values(counts);
  const max = Math.max(...values);
  const total = values.reduce((sum, n) => sum + n, 0);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <Text style={styles.title}>How are you{'\n'}feeling?</Text>
      <Text style={styles.subtitle}>Tap a mood to log it</Text>

      <View style={styles.grid}>
        {MOODS.map((m) => (
          <MoodButton
            key={m.key}
            emoji={m.emoji}
            label={m.label}
            onPress={() => logMood(m.key)}
          />
        ))}
      </View>

      <View style={styles.counts}>
        {MOODS.map((m) => {
          const isTop = max > 0 && counts[m.key] === max;
          return (
            <View key={m.key} style={[styles.countRow, isTop && styles.countRowTop]}>
              <Text style={styles.countEmoji}>{m.emoji}</Text>
              <Text style={styles.countLabel}>{m.label}</Text>
              <Text style={[styles.countNumber, isTop && styles.countNumberTop]}>
                {counts[m.key]}
              </Text>
            </View>
          );
        })}
        <Text style={styles.total}>Total logs: {total}</Text>
      </View>

      <Pressable
        onPress={reset}
        style={({ pressed }) => [styles.resetButton, pressed && { opacity: 0.7 }]}
      >
        <Text style={styles.resetText}>Reset</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0720',
    paddingHorizontal: 22,
    paddingTop: 70,
  },
  title: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 34,
    lineHeight: 42,
    color: '#f3e8ff',
  },
  subtitle: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 15,
    color: '#a78bfa',
    marginTop: 6,
    marginBottom: 24,
  },
  grid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  counts: { marginTop: 6 },
  countRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1038',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  countRowTop: { borderColor: '#a855f7', backgroundColor: '#2a1650' },
  countEmoji: { fontSize: 26, marginRight: 12 },
  countLabel: {
    flex: 1,
    fontFamily: 'Poppins_400Regular',
    fontSize: 17,
    color: '#e9d5ff',
  },
  countNumber: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 22,
    color: '#c4b5fd',
  },
  countNumberTop: { fontFamily: 'Poppins_700Bold', fontSize: 30, color: '#d8b4fe' },
  total: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#a78bfa',
    textAlign: 'center',
    marginTop: 6,
  },
  resetButton: {
    marginTop: 'auto',
    marginBottom: 40,
    backgroundColor: '#7c3aed',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  resetText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: '#fff',
  },
});