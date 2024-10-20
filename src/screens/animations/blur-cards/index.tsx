import { Canvas } from '@shopify/react-native-skia';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { GradientBackground } from '@/screens/animations/blur-cards/gradient-background';
import { Cards } from '@/screens/animations/blur-cards/cards';

interface BlurCardsScreenProps {}

export const BlurCardsScreen: React.FC<BlurCardsScreenProps> = () => {
  const progress = useSharedValue(0);

  return (
    <View
      style={styles.container}
      onTouchStart={() => {
        progress.value = withTiming(1, { duration: 1000 });
      }}
      onTouchEnd={() => {
        progress.value = withTiming(0, { duration: 1000 });
      }}
    >
      <StatusBar style="light" />

      <Canvas style={styles.canvas}>
        <GradientBackground />
        <Cards progress={progress} />
      </Canvas>
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
  canvas: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
