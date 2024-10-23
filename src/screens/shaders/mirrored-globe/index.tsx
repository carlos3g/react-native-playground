import { Canvas, Fill, Shader, Skia, useClock } from '@shopify/react-native-skia';
import { Dimensions, StyleSheet } from 'react-native';
import { useDerivedValue } from 'react-native-reanimated';

const { height: WindowHeight, width: WindowWidth } = Dimensions.get('window');

const source = Skia.RuntimeEffect.Make(`
uniform float2 iResolution;
uniform float iTime;

vec4 main(vec2 FC) {
  vec4 o = vec4(0);
  vec2 p = vec2(0), c=p, u=FC.xy*2.-iResolution.xy;
  float a;
  for (float i=0; i<4e2; i++) {
    a = i/2e2-1.;
    p = cos(i*2.4+iTime+vec2(0,11))*sqrt(1.-a*a);
    c = u/iResolution.y+vec2(p.x,a)/(p.y+2.);
    o += (cos(i+vec4(0,2,4,0))+1.)/dot(c,c)*(1.-p.y)/3e4;
  }
  return o;
}`)!;

interface MirroredGlobeProps {}

export const MirroredGlobe: React.FC<MirroredGlobeProps> = () => {
  const clock = useClock();

  const uniforms = useDerivedValue(
    () => ({
      iTime: clock.value / 1000,
      iResolution: { y: WindowHeight, x: WindowWidth },
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
    backgroundColor: 'black',
  },
});
