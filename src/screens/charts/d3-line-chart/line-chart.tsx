import { StyleSheet, View } from 'react-native';
import { Svg, Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import * as d3 from 'd3';
import { useState } from 'react';

const CHART_ASPECT_RATIO = 9 / 16;

interface LineChartProps {
  data: number[];
  color: string;
}

export const LineChart: React.FC<LineChartProps> = (props) => {
  const { color, data } = props;

  const [width, setWidth] = useState(0);

  const height = width * CHART_ASPECT_RATIO;
  const chartHeight = (height * 2) / 4;

  const minValue = Math.min(...data);
  const maxValue = Math.max(...data);

  const yScale = d3.scaleLinear().domain([minValue, maxValue]).range([chartHeight, 0]);
  const xScale = d3
    .scaleLinear()
    .domain([0, data.length - 1])
    .range([0, width]);

  const lineFn = d3
    .line<number>()
    .y((d, _) => yScale(d))
    .x((_, i) => xScale(i))
    .curve(d3.curveCardinal.tension(0.2));

  const areaFn = d3
    .area<number>()
    .x((_, i) => xScale(i))
    .y0(height)
    .y1((d, _) => yScale(d))
    .curve(d3.curveCardinal.tension(0.2));

  const svgLine = lineFn(data) ?? '';
  const svgArea = areaFn(data) ?? '';

  return (
    <View style={styles.container} onLayout={({ nativeEvent }) => setWidth(nativeEvent.layout.width)}>
      <Svg width={width} height={height} viewBox={`0 0 ${width} ${height - 12}`}>
        <Defs>
          <LinearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor={color} stopOpacity={0.7} />
            <Stop offset="100%" stopColor={color} stopOpacity={0} />
          </LinearGradient>
        </Defs>

        <Path d={svgLine} fill="none" stroke={color} strokeWidth={4} />
        <Path d={svgArea} fill="url(#gradient)" stroke="none" />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
