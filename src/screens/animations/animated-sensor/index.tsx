import { StyleSheet, View } from 'react-native';
import { Circle } from '@/screens/animations/animated-sensor/circle';
import { lightTheme } from '@/shared/theme/theme';

const COLORS = ['#203c56', '#544e68', '#8d697a', '#d08159', '#ffaa5e', '#ffd4a3', '#ffecd6'];

interface AnimatedSensorProps {}

export const AnimatedSensor: React.FC<AnimatedSensorProps> = () => (
  <View style={styles.container}>
    {COLORS.map((color, index) => (
      <Circle key={color} scale={1 - index * 0.1} color={COLORS[index]} />
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightTheme.colors.backgroundContrast,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
