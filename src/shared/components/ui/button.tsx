import type { TouchableOpacityProps } from 'react-native';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { $fontFamily, $fontSizes, lightTheme } from '@/shared/theme/theme';

interface ButtonProps extends TouchableOpacityProps {
  onPress: () => void;
  title?: string;
}

export const Button: React.FC<ButtonProps> = (props) => {
  const { onPress, title, style, disabled, ...rest } = props;

  return (
    <TouchableOpacity style={[styles.button, disabled && styles.buttonDisabled, style]} onPress={onPress} {...rest}>
      <Text style={[styles.buttonText, disabled && styles.buttonTextDisabled]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: lightTheme.colors.buttonPrimary,
    borderRadius: 16,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: lightTheme.colors.gray4,
  },
  buttonText: {
    color: lightTheme.colors.primaryContrast,
    fontFamily: $fontFamily.medium,
    fontSize: $fontSizes.paragraphMedium.fontSize,
    lineHeight: $fontSizes.paragraphMedium.lineHeight,
  },
  buttonTextDisabled: {
    color: lightTheme.colors.gray2,
  },
});
