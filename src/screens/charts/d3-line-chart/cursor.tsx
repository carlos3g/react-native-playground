import type React from 'react';
import type { SharedValue } from 'react-native-reanimated';
import Reanimated, { useAnimatedProps } from 'react-native-reanimated';
import { Circle, Line } from 'react-native-svg';

const AnimatedLine = Reanimated.createAnimatedComponent(Line);
const AnimatedCircle = Reanimated.createAnimatedComponent(Circle);

interface CursorProps {
  x: SharedValue<number>;
  y: SharedValue<number>;
  color: string;
  yLimit: number;
}

export const Cursor: React.FC<CursorProps> = (props) => {
  const { x, y, yLimit, color } = props;

  const animatedCursorLineProps = useAnimatedProps(() => ({
    x1: x.value,
    x2: x.value,
  }));

  const animatedCursorCircleProps = useAnimatedProps(() => ({
    cx: x.value,
    cy: y.value,
  }));

  return (
    <>
      <AnimatedLine animatedProps={animatedCursorLineProps} y1="0" y2={yLimit} stroke={color} strokeWidth={1} />
      <AnimatedCircle animatedProps={animatedCursorCircleProps} r={8} fill={color} />
    </>
  );
};
