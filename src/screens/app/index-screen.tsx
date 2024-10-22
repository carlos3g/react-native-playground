import { ScrollView, StyleSheet } from 'react-native';
import type { AppStackScreenProps } from '@/navigation/app.navigator.types';
import { sections } from '@/screens/app/data';
import { Header } from '@/screens/app/header';
import { Section } from '@/screens/app/section';
import { lightTheme } from '@/shared/theme/theme';

interface IndexScreenProps extends AppStackScreenProps<'IndexScreen'> {}

export const IndexScreen: React.FC<IndexScreenProps> = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />

      {sections.map(({ title, items }) => (
        <Section key={title} title={title} items={items} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 8,
    backgroundColor: lightTheme.colors.gray5,
  },
});
