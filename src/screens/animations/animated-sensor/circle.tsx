import { Dimensions, StyleSheet, View } from 'react-native';

import Animated, {
  interpolate,
  SensorType,
  useAnimatedSensor,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

const { width: WindowWidth, height: WindowHeight } = Dimensions.get('window');
const SIZE = WindowWidth * 1.25;
const X_DISTANCE = WindowWidth;
const Y_DISTANCE = WindowHeight;

interface CircleProps {
  color: string;
  scale: number;
}

export const Circle: React.FC<CircleProps> = (props) => {
  const { color, scale } = props;

  const animatedSensor = useAnimatedSensor(SensorType.ROTATION, {
    interval: 10,
  });

  const animatedStyle = useAnimatedStyle(() => {
    const { qx, qy } = animatedSensor.sensor.value;
    const correctedX = interpolate(qx, [-qx, qx], [qx, -qx]);

    return {
      transform: [
        {
          translateX: withSpring((correctedX * X_DISTANCE) / scale),
        },
        {
          translateY: withSpring((qy * Y_DISTANCE) / scale),
        },
      ],
    };
  });

  const circleStyle = {
    backgroundColor: color,
    width: SIZE * scale,
    height: SIZE * scale,
    borderRadius: (SIZE / 2) * scale,
  };

  return (
    <View style={styles.wrapper}>
      <Animated.View style={[circleStyle, animatedStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
  },
});
