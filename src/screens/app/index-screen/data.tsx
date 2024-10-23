import { FontAwesome, Fontisto, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import type { SectionItem } from '@/screens/app/index-screen/section';
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
      {
        label: 'Counter',
        value: 'Counter',
        icon: <MaterialCommunityIcons name="counter" size={16} color={lightTheme.colors.backgroundContrast} />,
      },
      {
        label: 'Animated Sensor',
        value: 'AnimatedSensor',
        icon: <MaterialIcons name="sensors" size={16} color={lightTheme.colors.backgroundContrast} />,
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
  {
    title: 'Shaders',
    items: [
      {
        label: 'Neurons',
        value: 'Neurons',
        icon: <MaterialCommunityIcons name="brain" size={16} color={lightTheme.colors.backgroundContrast} />,
      },
    ],
  },
  {
    title: 'Charts',
    items: [],
  },
  {
    title: 'Micro interactions',
    items: [],
  },
];
