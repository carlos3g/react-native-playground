import { Blur, RadialGradient, Rect } from '@shopify/react-native-skia';
import { Dimensions } from 'react-native';

const { width: WindowWidth, height: WindowHeight } = Dimensions.get('window');

interface GradientBackgroundProps {}

export const GradientBackground: React.FC<GradientBackgroundProps> = () => {
  return (
    <Rect x={0} y={0} width={WindowWidth} height={WindowHeight} color="blue">
      <RadialGradient
        c={{ x: WindowWidth / 2, y: WindowHeight / 2 }}
        r={WindowWidth / 2}
        colors={['violet', 'black']}
      />

      <Blur blur={100} />
    </Rect>
  );
};
