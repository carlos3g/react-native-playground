import { StyleSheet } from 'react-native';
import { SystemBars } from 'react-native-edge-to-edge';
import { SafeAreaView } from 'react-native-safe-area-context';
import { darkTheme } from '@/shared/theme/theme';
import { LineChart } from '@/screens/charts/d3-line-chart/line-chart';

interface D3LineChartProps {}

export const D3LineChart: React.FC<D3LineChartProps> = () => {
  const data = [500, 450, 700, 310, 270, 510, 340, 400];

  return (
    <SafeAreaView style={styles.container}>
      <SystemBars style="light" />

      <LineChart data={data} color="#C5F" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: darkTheme.colors.backgroundContrast,
  },
});
