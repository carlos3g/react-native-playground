import { BlurMask, Canvas, RoundedRect, SweepGradient, vec } from '@shopify/react-native-skia';

const CANVA_PADDING = 40;

interface BackgroundGradientProps {
  width: number;
  height: number;
}

export const BackgroundGradient: React.FC<BackgroundGradientProps> = (props) => {
  const { height, width } = props;

  return (
    <Canvas style={{ width: width + CANVA_PADDING, height: height + CANVA_PADDING }}>
      <RoundedRect x={CANVA_PADDING / 2} y={CANVA_PADDING / 2} width={width} height={height} color="white" r={20}>
        <SweepGradient
          c={vec((width + CANVA_PADDING) / 2, (height + CANVA_PADDING) / 2)}
          colors={['cyan', 'magenta', 'yellow', 'cyan']}
        />
        <BlurMask blur={5} style="solid" />
      </RoundedRect>
    </Canvas>
  );
};
