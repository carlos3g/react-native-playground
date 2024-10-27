import { Ionicons } from '@expo/vector-icons';
import { memo, useEffect, useMemo } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { getRandomNumber } from '@/shared/utils';

const { width: WindowWidth, height: WindowHeight } = Dimensions.get('window');
const END_Y_POS = WindowHeight * 0.7;
const SPAWN_Y_POS = 16;
const MIN_SPAWN_X_POS = 16;
const MAX_SPAWN_X_POS = WindowWidth * 0.3;

interface HeartProps {
  duration?: number;
  onComplete?: () => void;
}

export const Heart: React.FC<HeartProps> = memo((props) => {
  const { duration = 1500, onComplete } = props;

  const positionY = useSharedValue(SPAWN_Y_POS);
  const opacity = useSharedValue(1);

  const heartAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(positionY.value, [16, 31, 46], [0, 1.5, 1], Extrapolation.CLAMP);

    const translateX = interpolate(
      positionY.value,
      [16, END_Y_POS / 6, END_Y_POS / 3, END_Y_POS / 2, END_Y_POS],
      [0, 25, 15, 0, 10]
    );

    const rotate = interpolate(
      positionY.value,
      [16, END_Y_POS / 6, END_Y_POS / 3, END_Y_POS / 2, END_Y_POS],
      [0, -5, 0, 5, 0]
    );

    return {
      bottom: positionY.value,
      opacity: opacity.value,
      transform: [{ scale }, { translateX }, { rotate: `${rotate}deg` }],
    };
  });

  useEffect(() => {
    const timingConfig = { duration };
    positionY.value = withTiming(END_Y_POS, timingConfig);
    opacity.value = withTiming(0, timingConfig, () => {
      if (onComplete) {
        runOnJS(onComplete)();
      }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const left = useMemo(() => getRandomNumber(MIN_SPAWN_X_POS, MAX_SPAWN_X_POS), []);

  return (
    <Animated.View style={[styles.iconWrapper, { left }, heartAnimatedStyle]}>
      <Ionicons name="heart" size={40} />
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  iconWrapper: {
    position: 'absolute',
  },
});
