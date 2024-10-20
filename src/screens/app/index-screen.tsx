import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
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
];

interface IndexScreenProps extends AppStackScreenProps<'IndexScreen'> {}

export const IndexScreen: React.FC<IndexScreenProps> = () => {
  const { navigate } = useNavigation<AppStackNavigationProp<'IndexScreen'>>();

  return (
    <View style={styles.container}>
      {screens.map(({ label, value }) => (
        <Button key={value} onPress={() => navigate(value)} title={label} />
      ))}
    </View>
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
