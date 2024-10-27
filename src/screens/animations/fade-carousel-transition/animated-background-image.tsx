import type { FC } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';

interface AnimatedBackgroundImageProps {
  uri: string;
  index: number;
  scrollX: SharedValue<number>;
}

const { width: WindowWidth } = Dimensions.get('window');

export const AnimatedBackgroundImage: FC<AnimatedBackgroundImageProps> = ({ uri, index, scrollX }) => {
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollX.value,
      [(index - 1) * WindowWidth, index * WindowWidth, (index + 1) * WindowWidth],
      [0, 1, 0]
    ),
  }));

  return <Animated.Image source={{ uri }} blurRadius={50} style={[styles.backgroundImage, animatedStyle]} />;
};

const styles = StyleSheet.create({
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
  },
});
