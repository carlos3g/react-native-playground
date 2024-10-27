import MaskedView from '@react-native-masked-view/masked-view';
import { useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Easing, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { Svg } from 'react-native-svg';
import { lightTheme } from '@/shared/theme/theme';
import { Wave } from '@/screens/animations/wave-animation/wave';

const SIZE = Dimensions.get('window').width - 64;

interface WaveAnimationProps {}

export const WaveAnimation: React.FC<WaveAnimationProps> = () => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) }), -1, true);
  }, [progress]);

  return (
    <View style={styles.container}>
      <MaskedView maskElement={<View style={styles.maskElement} />}>
        <Svg width={SIZE} height={SIZE} viewBox="0 0 1 1" style={styles.svgWrapper}>
          <Wave progress={progress} />
        </Svg>
      </MaskedView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  svgWrapper: {
    backgroundColor: lightTheme.colors.backgroundContrast,
  },
  maskElement: {
    width: SIZE,
    aspectRatio: 1,
    borderRadius: SIZE / 2,
    backgroundColor: 'black',
  },
});
