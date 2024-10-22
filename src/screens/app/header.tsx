import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { $fontFamily, $fontSizes, lightTheme } from '@/shared/theme/theme';

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  const { top } = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: top + 16 }]}>
      <View>
        <Text style={styles.headerText}>@carlos3g/</Text>
        <Text style={styles.subHeadingText}>react-native-playground</Text>
      </View>

      <Text style={styles.description}>Here you can find my experiments and studies related to react-native/expo.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: lightTheme.colors.background,
    paddingHorizontal: 16,
    minHeight: 160,
    paddingBottom: 16,
    gap: 8,
  },
  headerText: {
    color: lightTheme.colors.gray2,
    fontFamily: $fontFamily.bold,
    fontSize: $fontSizes.headingSmall.fontSize,
    lineHeight: $fontSizes.headingSmall.lineHeight,
  },
  subHeadingText: {
    fontFamily: $fontFamily.boldItalic,
    fontSize: $fontSizes.headingMedium.fontSize,
    lineHeight: $fontSizes.headingMedium.lineHeight,
  },
  description: {
    color: lightTheme.colors.gray1,
    fontFamily: $fontFamily.regular,
    fontSize: $fontSizes.paragraphSmall.fontSize,
    lineHeight: $fontSizes.paragraphSmall.lineHeight,
  },
});
