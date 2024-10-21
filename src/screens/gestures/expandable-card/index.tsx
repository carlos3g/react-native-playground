import { Dimensions, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { toTheNearest } from '@/shared/utils';
import { lightTheme } from '@/shared/theme/theme';

const { width: WindowWidth } = Dimensions.get('window');

const CARD_MAX_HEIGHT = 256;
const CARD_MIN_HEIGHT = 64;
const CARD_WIDTH = WindowWidth * 0.9;

interface ExpandableCardProps {}

export const ExpandableCard: React.FC<ExpandableCardProps> = () => {
  const scale = useSharedValue(1);
  const scaleCtx = useSharedValue(1);

  const pinchGesture = Gesture.Pinch()
    .onChange((e) => {
      scale.value = scaleCtx.value * e.scale;
    })
    .onEnd(() => {
      const nearestScale = toTheNearest(scale.value, 1, CARD_MAX_HEIGHT / CARD_MIN_HEIGHT);
      scale.value = withSpring(nearestScale);
      scaleCtx.value = nearestScale;
    });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      height: CARD_MIN_HEIGHT * scale.value,
    };
  });

  return (
    <View style={styles.container}>
      <GestureDetector gesture={pinchGesture}>
        <Animated.View style={[styles.card, animatedStyles]} />
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
  card: {
    width: CARD_WIDTH,
    height: CARD_MIN_HEIGHT,
    borderRadius: 20,
    backgroundColor: lightTheme.colors.backgroundContrast,
  },
});
