import { tint } from 'polished';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SystemBars } from 'react-native-edge-to-edge';
import Animated, { SlideInDown, SlideOutUp } from 'react-native-reanimated';
import { lightTheme } from '@/shared/theme/theme';

interface CounterProps {}

export const Counter: React.FC<CounterProps> = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount((pS) => pS + 1);
  const decrement = () => setCount((pS) => pS - 1);

  return (
    <View style={styles.container}>
      <SystemBars style="dark" />

      <View style={styles.countContainer}>
        <Text style={styles.text}>🚀</Text>
        <Animated.Text key={count} entering={SlideInDown} exiting={SlideOutUp} style={styles.text}>
          {count}
        </Animated.Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={decrement}>
          <Text style={styles.buttonLabel}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={increment}>
          <Text style={styles.buttonLabel}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: lightTheme.colors.background,
    paddingHorizontal: '20%',
  },
  countContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: tint(0.6, lightTheme.colors.backgroundContrast),
    backgroundColor: lightTheme.colors.backgroundContrast,
    overflow: 'hidden',
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  text: {
    fontSize: 56,
    color: lightTheme.colors.background,
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 56,
    aspectRatio: 1,
    borderRadius: 56 / 2,
    backgroundColor: lightTheme.colors.backgroundContrast,
    borderWidth: 2,
    borderColor: tint(0.6, lightTheme.colors.backgroundContrast),
  },
  buttonLabel: {
    fontSize: 44,
    lineHeight: 44,
    color: lightTheme.colors.background,
    marginBottom: -6,
    textAlignVertical: 'bottom',
    textAlign: 'center',
    includeFontPadding: false,
  },
});
