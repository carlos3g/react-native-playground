import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { AppStackNavigationProp, AppStackParams, AppStackScreenProps } from '@/navigation/app.navigator.types';
import { Button } from '@/shared/components/ui/button';
import { lightTheme } from '@/shared/theme/theme';

type ScreenData = {
  label: string;
  value: keyof AppStackParams;
};

const screens: ScreenData[] = [
  {
    label: 'Blur Cards',
    value: 'BlurCardsScreen',
  },
  {
    label: 'Rainbow Spinner',
    value: 'RainbowSpinnerScreen',
  },
  {
    label: 'Gradient Clock',
    value: 'GradientClock',
  },
  {
    label: 'Chasing Bubbles',
    value: 'ChasingBubblesScreen',
  },
  {
    label: 'Animated 3D Card',
    value: 'Animated3DCard',
  },
];

interface IndexScreenProps extends AppStackScreenProps<'IndexScreen'> {}

export const IndexScreen: React.FC<IndexScreenProps> = () => {
  const { navigate } = useNavigation<AppStackNavigationProp<'IndexScreen'>>();

  return (
    <SafeAreaView style={styles.container}>
      {screens.map(({ label, value }) => (
        <Button key={value} onPress={() => navigate(value)} title={label} />
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 8,
    paddingTop: 16,
    backgroundColor: lightTheme.colors.background,
    paddingHorizontal: 16,
  },
});
