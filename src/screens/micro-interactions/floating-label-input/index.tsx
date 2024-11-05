import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { lightTheme } from '@/shared/theme/theme';
import { Input } from '@/screens/micro-interactions/floating-label-input/input';

interface FloatingLabelInputProps {}

export const FloatingLabelInput: React.FC<FloatingLabelInputProps> = () => {
  const [input1, setInput1] = useState<string | undefined>();
  const [input2, setInput2] = useState<string | undefined>();

  return (
    <SafeAreaView style={styles.container}>
      <Input label="Carlos Mesquita" value={input1} onChangeText={setInput1} />

      <Input label="Rafael" value={input2} onChangeText={setInput2} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: lightTheme.colors.background,
  },
});
