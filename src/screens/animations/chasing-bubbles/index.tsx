import { StyleSheet } from 'react-native';
import { SystemBars } from 'react-native-edge-to-edge';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { lightTheme } from '@/shared/theme/theme';
import { DotsGrid } from '@/screens/animations/chasing-bubbles/dots-grid';

interface ChasingBubblesScreenProps {}

export const ChasingBubblesScreen: React.FC<ChasingBubblesScreenProps> = () => {
  const fingerX = useSharedValue(-1);
  const fingerY = useSharedValue(-1);

  const gesture = Gesture.Pan()
    .onBegin(({ x, y }) => {
      fingerX.value = x;
      fingerY.value = y;
    })
    .onChange(({ x, y }) => {
      fingerX.value = x;
      fingerY.value = y;
    })
    .onEnd(() => {
      fingerX.value = -1;
      fingerY.value = -1;
    })
    .onFinalize(() => {
      fingerX.value = -1;
      fingerY.value = -1;
    });

  return (
    <SafeAreaView style={styles.container}>
      <SystemBars style="dark" />

      <GestureDetector gesture={gesture}>
        <DotsGrid fingerX={fingerX} fingerY={fingerY} />
      </GestureDetector>
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightTheme.colors.background,
  },
  canvas: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
