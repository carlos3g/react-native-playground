import { FontAwesome, Fontisto, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import type { SectionItem } from '@/screens/app/section';
import { lightTheme } from '@/shared/theme/theme';

export const sections: { title: string; items: SectionItem[] }[] = [
  {
    title: 'Animations',
    items: [
      {
        label: 'Blur Cards',
        value: 'BlurCardsScreen',
        icon: <MaterialCommunityIcons name="card-multiple" size={16} color={lightTheme.colors.backgroundContrast} />,
      },
      {
        label: 'Rainbow Spinner',
        value: 'RainbowSpinnerScreen',
        icon: <Fontisto name="spinner" size={16} color={lightTheme.colors.backgroundContrast} />,
      },
      {
        label: 'Gradient Clock',
        value: 'GradientClock',
        icon: <MaterialIcons name="gradient" size={16} color={lightTheme.colors.backgroundContrast} />,
      },
      {
        label: 'Chasing Bubbles',
        value: 'ChasingBubblesScreen',
        icon: <MaterialIcons name="bubble-chart" size={16} color={lightTheme.colors.backgroundContrast} />,
      },
      {
        label: 'Animated 3D Card',
        value: 'Animated3DCard',
        icon: <MaterialCommunityIcons name="card" size={16} color={lightTheme.colors.backgroundContrast} />,
      },
    ],
  },
  {
    title: 'Gestures',
    items: [
      {
        label: 'Controlled Ball',
        value: 'ControlledBall',
        icon: <FontAwesome name="circle" size={16} color={lightTheme.colors.backgroundContrast} />,
      },
      {
        label: 'Expandable Card',
        value: 'ExpandableCard',
        icon: <FontAwesome name="expand" size={16} color={lightTheme.colors.backgroundContrast} />,
      },
    ],
  },
];
