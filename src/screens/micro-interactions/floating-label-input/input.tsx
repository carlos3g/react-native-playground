import type { TextInputProps } from 'react-native';
import { StyleSheet, TextInput } from 'react-native';
import Reanimated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { lightTheme } from '@/shared/theme/theme';

const PADDING_LEFT = 20;
const LABEL_SIZE = 14;
const INPUT_BORDER_WIDTH = 2;
const INPUT_HEIGHT = 64;

interface InputProps extends Omit<TextInputProps, 'placeholder' | 'value' | 'onChangeText' | 'onChange'> {
  label: string;
  value?: string;
  onChangeText: (value?: string) => void;
}

export const Input: React.FC<InputProps> = (props) => {
  const { label, value, ...rest } = props;

  const progress = useSharedValue(0);
  const labelWidth = useSharedValue(0);

  const labelAnimatedStyle = useAnimatedStyle(() => {
    return {
      top: interpolate(progress.value, [0, 1], [(INPUT_HEIGHT - INPUT_BORDER_WIDTH * 2) / 2, 0]),
      transform: [{ translateY: -((LABEL_SIZE + INPUT_BORDER_WIDTH * 2) / 2) }, { translateX: -10 }],
      color: interpolateColor(progress.value, [0, 1], [lightTheme.colors.gray1, lightTheme.colors.carrotSecondary]),
    };
  });

  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      borderColor: interpolateColor(
        progress.value,
        [0, 1],
        [lightTheme.colors.gray4, lightTheme.colors.carrotSecondary]
      ),
    };
  });

  const borderHidderStyle = useAnimatedStyle(() => {
    return {
      width: labelWidth.value,
      top: interpolate(progress.value, [0, 1], [(INPUT_HEIGHT - INPUT_BORDER_WIDTH * 2) / 2, -INPUT_BORDER_WIDTH]),
      left: PADDING_LEFT,
      transform: [{ translateX: -10 }],
    };
  });

  return (
    <Reanimated.View style={[styles.container, containerAnimatedStyle]}>
      <Reanimated.Text
        style={[styles.label, labelAnimatedStyle]}
        onLayout={({ nativeEvent }) => {
          labelWidth.value = nativeEvent.layout.width + 20;
        }}
      >
        {label}
      </Reanimated.Text>

      <Reanimated.View style={[styles.inputHidder, borderHidderStyle]} />

      <TextInput
        style={styles.input}
        value={value}
        {...rest}
        onFocus={() => {
          progress.value = withTiming(1);
        }}
        onBlur={() => {
          if (value) {
            return;
          }
          progress.value = withTiming(0);
        }}
      />
    </Reanimated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
    borderWidth: INPUT_BORDER_WIDTH,
    borderColor: lightTheme.colors.gray4,
    borderRadius: 16,
    height: 64,
    backgroundColor: lightTheme.colors.background,
  },
  label: {
    position: 'absolute',
    left: PADDING_LEFT + 10,
    fontSize: LABEL_SIZE,
    zIndex: 2,
  },
  input: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingLeft: PADDING_LEFT,
  },
  inputHidder: {
    height: INPUT_BORDER_WIDTH,
    backgroundColor: lightTheme.colors.background,
    position: 'absolute',
  },
});
