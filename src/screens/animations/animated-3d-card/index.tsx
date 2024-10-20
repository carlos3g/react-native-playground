import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { BackgroundGradient } from '@/screens/animations/animated-3d-card/background-gradient';

const { width: WindowWidth } = Dimensions.get('window');

const GRADIENT_HEIGHT = 256;
const GRADIENT_WIDTH = WindowWidth * 0.9;

const CARD_HEIGHT = GRADIENT_HEIGHT - 5;
const CARD_WIDTH = GRADIENT_WIDTH - 5;

interface Animated3DCardProps {}

export const Animated3DCard: React.FC<Animated3DCardProps> = () => {
  const rotateX = useSharedValue(0);
  const rotateY = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onBegin(({ x, y }) => {
      rotateX.value = withTiming(interpolate(y, [0, CARD_HEIGHT], [10, -10], Extrapolation.CLAMP));
      rotateY.value = withTiming(interpolate(x, [0, CARD_WIDTH], [-10, 10], Extrapolation.CLAMP));
    })
    .onUpdate(({ x, y }) => {
      rotateX.value = interpolate(y, [0, CARD_HEIGHT], [10, -10], Extrapolation.CLAMP);
      rotateY.value = interpolate(x, [0, CARD_WIDTH], [-10, 10], Extrapolation.CLAMP);
    })
    .onEnd(() => {
      rotateX.value = withTiming(0);
      rotateY.value = withTiming(0);
    })
    .onFinalize(() => {
      rotateX.value = withTiming(0);
      rotateY.value = withTiming(0);
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          perspective: 300,
        },
        {
          rotateX: `${rotateX.value}deg`,
        },
        {
          rotateY: `${rotateY.value}deg`,
        },
      ],
    };
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <BackgroundGradient width={GRADIENT_WIDTH} height={GRADIENT_HEIGHT} />

      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.card, animatedStyle]} />
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    position: 'absolute',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: 'black',
    borderRadius: 20,
  },
});
