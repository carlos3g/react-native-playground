import { BackdropBlur, Group, Path, rect, rrect, Skia } from '@shopify/react-native-skia';
import { useMemo } from 'react';
import type { SharedValue } from 'react-native-reanimated';
import { useDerivedValue } from 'react-native-reanimated';

export const CardHeight = 200;
export const CardWidth = 300;
export const CardRadius = 20;

interface BlurredCardProps {
  progress: SharedValue<number>;
}

export const BlurredCard: React.FC<BlurredCardProps> = (props) => {
  const { progress } = props;

  const clipPath = useMemo(() => {
    const path = Skia.Path.Make();

    path.addRRect(rrect(rect(0, 0, CardWidth, CardHeight), CardRadius, CardRadius));

    return path;
  }, []);

  const processedBlur = useDerivedValue(() => {
    return 5 * progress.value;
  });

  return (
    <Group>
      <Path path={clipPath} color="rgba(255, 255, 255, 0.1)" />
      <Path path={clipPath} style="stroke" color="rgba(255, 255, 255, 0.85)" />
      <BackdropBlur blur={processedBlur} clip={clipPath} />
    </Group>
  );
};
