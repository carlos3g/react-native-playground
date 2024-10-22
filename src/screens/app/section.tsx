import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { $fontFamily, $fontSizes, lightTheme } from '@/shared/theme/theme';
import type { AppStackNavigationProp, AppStackParams } from '@/navigation/app.navigator.types';

export type SectionItem = {
  label: string;
  value: keyof AppStackParams;
  icon?: React.ReactNode;
};

interface SectionProps {
  title: string;
  items: SectionItem[];
}

const IconFallback = <FontAwesome5 name="question" size={16} color={lightTheme.colors.backgroundContrast} />;

export const Section: React.FC<SectionProps> = (props) => {
  const { items, title } = props;

  const { navigate } = useNavigation<AppStackNavigationProp<'IndexScreen'>>();

  return (
    <View style={styles.section}>
      <Text style={styles.sectionHeaderText}>{title}</Text>

      <View style={styles.sectionContent}>
        {items.map(({ label, value, icon }) => (
          <TouchableOpacity key={value} style={styles.sectionButton} onPress={() => navigate(value)}>
            <View style={styles.sectionButtonLeft}>{icon || IconFallback}</View>
            <Text style={styles.sectionButtonText}>{label}</Text>
            <View style={styles.sectionButtonRight}>
              <Ionicons name="chevron-forward-outline" size={16} color={lightTheme.colors.gray2} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    backgroundColor: lightTheme.colors.background,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  sectionHeaderText: {
    color: lightTheme.colors.gray2,
    fontFamily: $fontFamily.regular,
    fontSize: $fontSizes.paragraphCaption.fontSize,
    lineHeight: $fontSizes.paragraphCaption.lineHeight,
  },
  sectionContent: {},
  sectionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 8,
  },
  sectionButtonLeft: {
    width: 16,
    maxHeight: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionButtonRight: {},
  sectionButtonText: {
    flex: 1,
    color: lightTheme.colors.backgroundContrast,
    fontFamily: $fontFamily.regular,
    fontSize: $fontSizes.paragraphSmall.fontSize,
    lineHeight: $fontSizes.paragraphSmall.lineHeight,
  },
});
