import { Pressable, Text, StyleSheet } from 'react-native';

export default function MoodButton({ emoji, label, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '47%',
    backgroundColor: '#1e1038',
    borderWidth: 1,
    borderColor: '#3b2270',
    borderRadius: 24,
    paddingVertical: 22,
    alignItems: 'center',
    marginBottom: 14,
  },
  pressed: {
    backgroundColor: '#3b2270',
    transform: [{ scale: 0.96 }],
  },
  emoji: { fontSize: 48 },
  label: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 15,
    color: '#e9d5ff',
    marginTop: 8,
  },
});