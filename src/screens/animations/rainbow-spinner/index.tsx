import { StyleSheet, View } from 'react-native';
import { SystemBars } from 'react-native-edge-to-edge';
import { Spinner } from '@/screens/animations/rainbow-spinner/spinner';

interface RainbowSpinnerScreenProps {}

export const RainbowSpinnerScreen: React.FC<RainbowSpinnerScreenProps> = () => {
  return (
    <View style={styles.container}>
      <SystemBars style="light" />
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
