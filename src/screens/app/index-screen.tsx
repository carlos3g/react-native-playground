import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { AppStackNavigationProp, AppStackScreenProps } from '@/navigation/app.navigator.types';
import { lightTheme } from '@/shared/theme/theme';

interface IndexScreenProps extends AppStackScreenProps<'IndexScreen'> {}

export const IndexScreen: React.FC<IndexScreenProps> = () => {
  const { navigate } = useNavigation<AppStackNavigationProp<'IndexScreen'>>();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => navigate('BlurCardsScreen')}>
        <Text style={styles.buttonText}>Blur Cards</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    backgroundColor: lightTheme.colors.background,
    paddingHorizontal: 16,
  },
  button: {
    backgroundColor: lightTheme.colors.buttonPrimary,
    padding: 16,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: lightTheme.colors.primaryContrast,
    textAlign: 'center',
  },
});
