import { range } from 'lodash';
import type { SharedValue } from 'react-native-reanimated';
import { memo, startTransition, useState } from 'react';
import { Canvas } from '@shopify/react-native-skia';
import { StyleSheet } from 'react-native';
import { Dot, GAP } from '@/screens/animations/chasing-bubbles/dot';

interface DotsGridProps {
  fingerX: SharedValue<number>;
  fingerY: SharedValue<number>;
}

export const DotsGrid: React.FC<DotsGridProps> = memo((props) => {
  const { fingerX, fingerY } = props;

  const [rows, setRows] = useState<number>(0);
  const [columns, setColumns] = useState<number>(0);

  return (
    <Canvas
      style={styles.canvas}
      onLayout={({ nativeEvent }) => {
        startTransition(() => {
          setRows(Math.round(nativeEvent.layout.height / GAP));
          setColumns(Math.round(nativeEvent.layout.width / GAP));
        });
      }}
    >
      {range(columns * rows).map((i) => (
        <Dot key={i} index={i} x={fingerX} y={fingerY} columns={columns} />
      ))}
    </Canvas>
  );
});

export const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
