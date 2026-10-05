import { Pressable, Text, StyleSheet } from 'react-native';

export default function MoodButton({ emoji, label, color, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Text style={[styles.circle, { backgroundColor: color }]}>{emoji}</Text>
      <Text style={[styles.label, { color }]}>{label.toUpperCase()}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { flex: 1, alignItems: 'center' },
  pressed: { transform: [{ scale: 0.92 }], opacity: 0.8 },
  circle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    overflow: 'hidden',
    textAlign: 'center',
    textAlignVertical: 'center',
    lineHeight: 70,
    fontSize: 34,
  },
  label: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 12,
    letterSpacing: 0.6,
    marginTop: 8,
  },
});