import { Canvas, Fill, Shader, Skia, useClock } from '@shopify/react-native-skia';
import { Dimensions, StyleSheet } from 'react-native';
import { useDerivedValue } from 'react-native-reanimated';

const { height: WindowHeight } = Dimensions.get('window');

const source = Skia.RuntimeEffect.Make(`
uniform float iResolution;
uniform float  iTime;

float f(vec3 p) {
    p.z -= iTime * 10.;
    float a = p.z * .1;
    p.xy *= mat2(cos(a), sin(a), -sin(a), cos(a));
    return .1 - length(cos(p.xy) + sin(p.yz));
}

half4 main(vec2 fragcoord) { 
    vec3 d = .5 - fragcoord.xy1 / iResolution;
    vec3 p=vec3(0);
    for (int i = 0; i < 32; i++) {
      p += f(p) * d;
    }
    return ((sin(p) + vec3(2, 5, 9)) / length(p)).xyz1;
}`)!;

interface NeuronsProps {}

export const Neurons: React.FC<NeuronsProps> = () => {
  const clock = useClock();

  const uniforms = useDerivedValue(
    () => ({
      iTime: clock.value / 1000,
      iResolution: WindowHeight,
    }),
    [clock]
  );

  return (
    <Canvas style={styles.canvas}>
      <Fill>
        <Shader source={source} uniforms={uniforms} />
      </Fill>
    </Canvas>
  );
};

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
