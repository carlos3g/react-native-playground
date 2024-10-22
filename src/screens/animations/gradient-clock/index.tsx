import { Canvas, Rect, SweepGradient, vec } from '@shopify/react-native-skia';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Easing, useDerivedValue, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

const { width: WindowWidth, height: WindowHeight } = Dimensions.get('screen');

interface GradientClockProps {}

export const GradientClock: React.FC<GradientClockProps> = () => {
  const progress = useSharedValue(0);

  const rotationAnimated = useDerivedValue(() => {
    return [{ rotate: Math.PI * progress.value }];
  });

  useEffect(() => {
    progress.value = withRepeat(withTiming(2, { duration: 4000, easing: Easing.linear }), -1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <Canvas style={styles.canvas}>
        <Rect x={0} y={0} width={WindowWidth} height={WindowHeight}>
          <SweepGradient
            origin={vec(WindowWidth / 2, WindowHeight / 2)}
            c={vec(WindowWidth / 2, WindowHeight / 2)}
            colors={['white', 'grey', '#222', 'black']}
            start={0}
            end={360}
            transform={rotationAnimated}
          />
        </Rect>
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  canvas: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
