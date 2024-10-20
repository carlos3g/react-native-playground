import { Circle } from '@shopify/react-native-skia';
import { memo } from 'react';
import { useDerivedValue, withSpring, type SharedValue } from 'react-native-reanimated';

export const GAP = 30;

interface DotProps {
  index: number;
  x: SharedValue<number>;
  y: SharedValue<number>;
  columns: number;
}

export const Dot: React.FC<DotProps> = memo((props) => {
  const { index, x, y, columns } = props;

  const currentRow = Math.floor(index / columns) * GAP + GAP / 2;
  const currentColumn = Math.floor(index % columns) * GAP + GAP / 2;

  const radius = useDerivedValue(() => {
    const hypot = Math.hypot(x.value - currentColumn, y.value - currentRow);

    if (hypot <= 55 && x.value !== -1) {
      return withSpring(11, {
        overshootClamping: true,
      });
    }

    return withSpring(3, {
      overshootClamping: true,
    });
  }, [x, y]);

  return <Circle cx={currentColumn} cy={currentRow} r={radius} color="black" />;
});
