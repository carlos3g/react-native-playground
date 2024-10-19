import { Group } from '@shopify/react-native-skia';
import { range } from 'lodash';
import { Dimensions } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import { CardContainer } from '@/screens/animations/blur-cards/card-container';
import { CardHeight, CardWidth } from '@/screens/animations/blur-cards/blurred-card';

const { width: WindowWidth, height: WindowHeight } = Dimensions.get('window');

interface CardsProps {
  progress: SharedValue<number>;
}

export const Cards: React.FC<CardsProps> = (props) => {
  const { progress } = props;

  return (
    <Group
      transform={[{ translateX: WindowWidth / 2 - CardWidth / 2 }, { translateY: WindowHeight / 2 - CardHeight / 2 }]}
    >
      {range(5).map((i) => (
        <CardContainer key={i} index={i} progress={progress} />
      ))}
    </Group>
  );
};
