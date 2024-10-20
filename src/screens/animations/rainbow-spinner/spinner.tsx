import { BlurMask, Canvas, Path, Skia, SweepGradient, vec } from '@shopify/react-native-skia';
import { useEffect, useMemo } from 'react';
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const CANVA_SIZE = 120;
const CIRCLE_SIZE = 64;
const STROKE_WIDTH = 10;
const CircleRadius = (CIRCLE_SIZE - STROKE_WIDTH) / 2;

interface SpinnerProps {}

export const Spinner: React.FC<SpinnerProps> = () => {
  const progress = useSharedValue(0);

  const circlePath = useMemo(() => {
    const path = Skia.Path.Make();
    path.addCircle(CANVA_SIZE / 2, CANVA_SIZE / 2, CircleRadius);
    return path;
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${2 * Math.PI * progress.value}rad`,
        },
      ],
    };
  });

  const startAnimated = useDerivedValue(() => {
    return interpolate(progress.value, [0, 0.5, 1], [0.3, 0.6, 0.3]);
  });

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 1000, easing: Easing.linear }), -1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Animated.View style={animatedStyle} entering={FadeIn.duration(1000)} exiting={FadeOut.duration(1000)}>
      <Canvas style={{ width: CANVA_SIZE, height: CANVA_SIZE }}>
        <Path
          path={circlePath}
          color="white"
          style="stroke"
          strokeWidth={STROKE_WIDTH}
          strokeCap="round"
          start={startAnimated}
          end={1}
        >
          <SweepGradient c={vec(CANVA_SIZE / 2, CANVA_SIZE / 2)} colors={['cyan', 'magenta', 'yellow', 'cyan']} />
          <BlurMask blur={8} style="solid" />
        </Path>
      </Canvas>
    </Animated.View>
  );
};
