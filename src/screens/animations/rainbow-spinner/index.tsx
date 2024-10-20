import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Spinner } from '@/screens/animations/rainbow-spinner/spinner';

interface RainbowSpinnerScreenProps {}

export const RainbowSpinnerScreen: React.FC<RainbowSpinnerScreenProps> = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Spinner />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
