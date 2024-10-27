import type { SharedValue } from 'react-native-reanimated';
import Animated, { useAnimatedProps, useDerivedValue } from 'react-native-reanimated';
import { Path } from 'react-native-svg';
import { lightTheme } from '@/shared/theme/theme';
import { lerp } from '@/shared/utils';

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface WaveProps {
  progress: SharedValue<number>;
}

export const Wave: React.FC<WaveProps> = ({ progress }) => {
  const coords = useDerivedValue(() => ({
    from: {
      x: lerp(progress.value, -0.1, -1),
      y: lerp(progress.value, 0.2, 0.5),
    },
    c1: {
      x: lerp(progress.value, 0, 0.5),
      y: lerp(progress.value, 0.7, 1),
    },
    c2: {
      x: lerp(progress.value, 1, 0.5),
      y: lerp(progress.value, 0.3, 0),
    },
    to: {
      x: lerp(progress.value, 1.1, 2),
      y: lerp(progress.value, 0.8, 0.5),
    },
  }));

  const pathProps = useAnimatedProps(() => ({
    d: `
    M ${coords.value.from.x} ${coords.value.from.y}
    C ${coords.value.c1.x} ${coords.value.c1.y} ${coords.value.c2.x} ${coords.value.c2.y} ${coords.value.to.x} ${coords.value.to.y}
    L 1 1
    L 0 1 Z
    `,
  }));

  return <AnimatedPath fill={lightTheme.colors.primary} animatedProps={pathProps} />;
};
