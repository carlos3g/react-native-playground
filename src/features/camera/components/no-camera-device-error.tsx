import { StyleSheet, Text, View } from 'react-native';
import { $fontFamily, $fontSizes, lightTheme } from '@/shared/theme/theme';

interface NoCameraDeviceErrorProps {}

export const NoCameraDeviceError: React.FC<NoCameraDeviceErrorProps> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>There&apos;s no camera device</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: lightTheme.colors.background,
    paddingHorizontal: 16,
  },
  text: {
    color: lightTheme.colors.backgroundContrast,
    fontFamily: $fontFamily.bold,
    fontSize: $fontSizes.paragraphLarge.fontSize,
    lineHeight: $fontSizes.paragraphLarge.lineHeight,
  },
});
