import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { $fontFamily, $fontSizes, lightTheme } from '@/shared/theme/theme';

interface ButtonProps {
  onPress: () => void;
  title?: string;
}

export const Button: React.FC<ButtonProps> = (props) => {
  const { onPress, title } = props;

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
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
  buttonText: {
    color: lightTheme.colors.primaryContrast,
    fontFamily: $fontFamily.medium,
    fontSize: $fontSizes.paragraphMedium.fontSize,
    lineHeight: $fontSizes.paragraphMedium.lineHeight,
  },
});
