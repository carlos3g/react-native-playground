import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { AppStackScreenProps } from '@/navigation/app.navigator.types';
import { sections } from '@/screens/app/index-screen/data';
import { Header } from '@/screens/app/index-screen/header';
import { Section } from '@/screens/app/index-screen/section';
import { lightTheme } from '@/shared/theme/theme';

interface IndexScreenProps extends AppStackScreenProps<'IndexScreen'> {}

export const IndexScreen: React.FC<IndexScreenProps> = () => {
  const { bottom } = useSafeAreaInsets();

  return (
    <ScrollView contentContainerStyle={[styles.container, { paddingBottom: bottom }]}>
      <Header />

      {sections.map(({ title, items }) => (
        <Section key={title} title={title} items={items} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    gap: 8,
    backgroundColor: lightTheme.colors.gray5,
  },
});
