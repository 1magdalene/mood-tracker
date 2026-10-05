import { useState } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
  useFonts,
  Nunito_400Regular,
  Nunito_700Bold,
  Nunito_800ExtraBold,
} from '@expo-google-fonts/nunito';
import MoodButton from './components/MoodButton';

const MOODS = [
  { key: 'sad', emoji: '😢', label: 'Sad', color: '#7089E0' },
  { key: 'tired', emoji: '😴', label: 'Tired', color: '#6BB5D6' },
  { key: 'happy', emoji: '😊', label: 'Happy', color: '#9CCB52' },
  { key: 'excited', emoji: '🤩', label: 'Excited', color: '#5BB85A' },
];

const INITIAL_COUNTS = { sad: 0, tired: 0, happy: 0, excited: 0 };

// 1 -> "1ST", 2 -> "2ND", 4 -> "4TH"
const ordinal = (n) => {
  const s = ['TH', 'ST', 'ND', 'RD'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
    Nunito_800ExtraBold,
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
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.top}>
          <Text style={styles.checkin}>{ordinal(total + 1)} CHECK-IN</Text>
          <Text style={styles.title}>How are you today?</Text>

          <View style={styles.faces}>
            {MOODS.map((m) => (
              <MoodButton
                key={m.key}
                emoji={m.emoji}
                label={m.label}
                color={m.color}
                onPress={() => logMood(m.key)}
              />
            ))}
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.analysis}>
          <Text style={styles.sectionTitle}>Mood Analysis</Text>
          <Text style={styles.sectionSub}>
            {total === 0
              ? 'No check-ins yet'
              : `${total} check-in${total === 1 ? '' : 's'} so far`}
          </Text>

          {MOODS.map((m) => {
            const count = counts[m.key];
            const isTop = max > 0 && count === max;
            const pct = max > 0 ? (count / max) * 100 : 0;
            return (
              <View key={m.key} style={styles.barRow}>
                <Text style={[styles.smallCircle, { backgroundColor: m.color }]}>
                  {m.emoji}
                </Text>
                <View style={styles.barBody}>
                  <View style={styles.barHeader}>
                    <Text style={[styles.barLabel, { color: m.color }]}>
                      {m.label.toUpperCase()}
                    </Text>
                    <Text style={[styles.barCount, isTop && styles.barCountTop]}>
                      {count}
                    </Text>
                  </View>
                  <View style={styles.track}>
                    <View
                      style={[
                        styles.fill,
                        { width: `${pct}%`, backgroundColor: m.color },
                      ]}
                    />
                  </View>
                </View>
              </View>
            );
          })}

          <Pressable
            onPress={reset}
            style={({ pressed }) => [styles.resetButton, pressed && { opacity: 0.6 }]}
          >
            <Text style={styles.resetText}>Reset</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFFFFF' },
  scroll: { paddingBottom: 40 },
  top: {
    paddingTop: 70,
    paddingHorizontal: 18,
    paddingBottom: 36,
    alignItems: 'center',
  },
  checkin: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 13,
    letterSpacing: 1,
    color: '#A0A6A9',
  },
  title: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 28,
    color: '#26292B',
    marginTop: 6,
    marginBottom: 30,
  },
  faces: { flexDirection: 'row', width: '100%' },
  divider: { height: 12, backgroundColor: '#EFF3F4' },
  analysis: { paddingHorizontal: 22, paddingTop: 30 },
  sectionTitle: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 28,
    color: '#26292B',
  },
  sectionSub: {
    fontFamily: 'Nunito_400Regular',
    fontSize: 16,
    color: '#8A9094',
    marginTop: 4,
    marginBottom: 22,
  },
  barRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  smallCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    overflow: 'hidden',
    textAlign: 'center',
    textAlignVertical: 'center',
    lineHeight: 42,
    fontSize: 20,
  },
  barBody: { flex: 1, marginLeft: 14 },
  barHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  barLabel: { fontFamily: 'Nunito_800ExtraBold', fontSize: 12, letterSpacing: 0.6 },
  barCount: { fontFamily: 'Nunito_700Bold', fontSize: 18, color: '#6B7276' },
  barCountTop: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 26,
    color: '#26292B',
  },
  track: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#EFF3F4',
    marginTop: 6,
    overflow: 'hidden',
  },
  fill: { height: '100%', borderRadius: 5 },
  resetButton: {
    marginTop: 14,
    alignSelf: 'center',
    backgroundColor: '#EFF3F4',
    borderRadius: 22,
    paddingVertical: 12,
    paddingHorizontal: 40,
  },
  resetText: { fontFamily: 'Nunito_800ExtraBold', fontSize: 15, color: '#26292B' },
});