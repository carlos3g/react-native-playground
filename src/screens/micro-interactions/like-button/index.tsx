import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import Reanimated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { lightTheme } from '@/shared/theme/theme';

const AnimatedIonicons = Reanimated.createAnimatedComponent(Ionicons);

interface LikeButtonProps {}

export const LikeButton: React.FC<LikeButtonProps> = () => {
  const liked = useSharedValue(false);

  const progress = useDerivedValue(() => {
    return liked.value ? withSpring(1, { duration: 500 }) : withSpring(0);
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(progress.value, [0, 0.6, 1], [1, 1.5, 1]),
      },
    ],
    color: interpolateColor(progress.value, [0, 1], ['#a1a1a1', '#f85230']),
  }));

  const handleToggleLike = () => {
    liked.value = !liked.value;
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback style={styles.button} onPress={handleToggleLike}>
        <AnimatedIonicons name="heart" size={40} style={animatedStyle} />
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightTheme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {},
});
