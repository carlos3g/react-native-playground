import { Skia } from '@shopify/react-native-skia';
import { StyleSheet, View } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission, useSkiaFrameProcessor } from 'react-native-vision-camera';
import { NoCameraDeviceError } from '@/features/camera/components/no-camera-device-error';
import { RequirePermissions } from '@/features/camera/components/require-permissions';
import { useCanCameraBeActive } from '@/features/camera/hooks/use-can-camera-be-active';

const invertColorsFilter = Skia.RuntimeEffect.Make(`
  uniform shader image;
  half4 main(vec2 pos) {
    vec4 color = image.eval(pos);
    return vec4((1.0 - color).rgb, 1.0);
  }
`)!;
const shaderBuilder = Skia.RuntimeShaderBuilder(invertColorsFilter);
const imageFilter = Skia.ImageFilter.MakeRuntimeShader(shaderBuilder, null, null);
const paint = Skia.Paint();
paint.setImageFilter(imageFilter);

interface InvertColorsProps {}

export const InvertColors: React.FC<InvertColorsProps> = () => {
  const device = useCameraDevice('back');
  const { hasPermission: hasCameraPermission } = useCameraPermission();
  const { canCameraBeActive } = useCanCameraBeActive();

  const frameProcessor = useSkiaFrameProcessor(
    (frame) => {
      'worklet';

      frame.render(paint);
    },
    [paint]
  );

  if (!hasCameraPermission) return <RequirePermissions />;

  if (device == null) return <NoCameraDeviceError />;

  return (
    <View style={styles.container}>
      <Camera
        style={styles.cameraContainer}
        device={device}
        isActive={canCameraBeActive}
        frameProcessor={frameProcessor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
});
