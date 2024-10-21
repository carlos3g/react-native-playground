// old version: https://github.com/carlos3g/animations-showcase/commit/c00207e6fd80589627893cb9ab30350f669b313f

import { Dimensions, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { lightTheme } from '@/shared/theme/theme';

const { width: WindowWidth } = Dimensions.get('screen');

const BALL_WIDTH = WindowWidth * 0.6;

interface ControlledBallProps {}

export const ControlledBall: React.FC<ControlledBallProps> = () => {
  const offset = useSharedValue({ x: 0, y: 0 });
  const scale = useSharedValue(1);

  const panGesture = Gesture.Pan()
    .onChange(({ translationX, translationY }) => {
      offset.value = {
        x: translationX,
        y: translationY,
      };
    })
    .onEnd(() => {
      offset.value = {
        x: withSpring(0),
        y: withSpring(0),
      };
    });

  const pinchGesture = Gesture.Pinch()
    .onChange((e) => {
      scale.value = e.scale;
    })
    .onEnd(() => {
      scale.value = withSpring(1);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: offset.value.x,
      },
      {
        translateY: offset.value.y,
      },
      {
        scale: scale.value,
      },
    ],
  }));

  return (
    <View style={styles.container}>
      <GestureDetector gesture={Gesture.Simultaneous(panGesture, pinchGesture)}>
        <Animated.View style={[styles.ball, animatedStyle]} />
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightTheme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ball: {
    borderRadius: BALL_WIDTH / 2,
    backgroundColor: lightTheme.colors.backgroundContrast,
    width: BALL_WIDTH,
    aspectRatio: 1,
  },
});

export default styles;
