import { Group } from '@shopify/react-native-skia';
import type { SharedValue } from 'react-native-reanimated';
import { useDerivedValue } from 'react-native-reanimated';
import { BlurredCard, CardHeight, CardWidth } from '@/screens/animations/blur-cards/blurred-card';

interface CardContainerProps {
  progress: SharedValue<number>;
  index: number;
}

export const CardContainer: React.FC<CardContainerProps> = (props) => {
  const { progress, index } = props;

  const proccessedTransform = useDerivedValue(() => {
    return [
      {
        rotate: (-Math.PI / 2) * progress.value,
      },
      {
        translateX: 25 * index * progress.value,
      },
      {
        perspective: 10000,
      },
      {
        rotateY: (Math.PI / 3) * progress.value,
      },
      {
        rotate: (Math.PI / 4) * progress.value,
      },
    ];
  });

  return (
    <Group
      key={index}
      origin={{
        x: CardWidth / 2,
        y: CardHeight / 2,
      }}
      transform={proccessedTransform}
    >
      <BlurredCard progress={progress} />
    </Group>
  );
};
