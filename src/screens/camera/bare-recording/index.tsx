import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Extrapolate } from '@shopify/react-native-skia';
import { useCallback, useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Reanimated, { interpolate, useAnimatedProps, useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { CameraProps, PhotoFile, VideoFile } from 'react-native-vision-camera';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import { lightTheme } from '@/shared/theme/theme';
import { CaptureButton } from '@/features/camera/components/capture-button';
import { useFlash } from '@/features/camera/hooks/use-flash';
import { useCanCameraBeActive } from '@/features/camera/hooks/use-can-camera-be-active';
import { useCameraFlip } from '@/features/camera/hooks/use-camera-flip';
import { FlashState } from '@/features/camera/enums';
import { RequirePermissions } from '@/features/camera/components/require-permissions';
import { NoCameraDeviceError } from '@/features/camera/components/no-camera-device-error';

export const MAX_ZOOM_FACTOR = 10;
const SCALE_FULL_ZOOM = 3;

Reanimated.addWhitelistedNativeProps({
  zoom: true,
});
const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);

interface BareRecordingProps {}

export const BareRecording: React.FC<BareRecordingProps> = () => {
  const cameraRef = useRef<Camera>(null);

  const zoom = useSharedValue(1);
  const zoomCtx = useSharedValue(1);

  const { cameraPosition, toggleCameraFlip } = useCameraFlip();
  const { flash, toggleFlash } = useFlash();

  const { top } = useSafeAreaInsets();
  const device = useCameraDevice(cameraPosition);
  const { hasPermission: hasCameraPermission } = useCameraPermission();
  const { canCameraBeActive } = useCanCameraBeActive();

  const onMediaCaptured = useCallback((media: PhotoFile | VideoFile) => {
    console.log(`Media captured! ${JSON.stringify(media)}`);
  }, []);

  const minZoom = device?.minZoom ?? 1;
  const maxZoom = Math.min(device?.maxZoom ?? 1, MAX_ZOOM_FACTOR);

  const cameraAnimatedProps = useAnimatedProps<CameraProps>(() => {
    const z = Math.max(Math.min(zoom.value, maxZoom), minZoom);

    return {
      zoom: z,
    };
  }, [maxZoom, minZoom, zoom]);

  useEffect(() => {
    zoom.value = device?.neutralZoom ?? 1;
  }, [zoom, device]);

  const pinchGesture = Gesture.Pinch()
    .onStart(() => {
      zoomCtx.value = zoom.value;
    })
    .onChange((event) => {
      const scale = interpolate(
        event.scale,
        [1 - 1 / SCALE_FULL_ZOOM, 1, SCALE_FULL_ZOOM],
        [-1, 0, 1],
        Extrapolate.CLAMP
      );
      zoom.value = interpolate(scale, [-1, 0, 1], [minZoom, zoomCtx.value, maxZoom], Extrapolate.CLAMP);
    });

  const supportsFlash = device?.hasFlash ?? false;

  if (!hasCameraPermission) return <RequirePermissions />;

  if (device == null) return <NoCameraDeviceError />;

  return (
    <View style={styles.container}>
      <View style={[styles.cameraFiltersContainer, { marginTop: top }]}>
        <TouchableOpacity style={styles.cameraFilterButton} onPress={toggleCameraFlip}>
          <MaterialCommunityIcons name="camera-flip" size={24} color={lightTheme.colors.backgroundContrast} />
        </TouchableOpacity>

        {supportsFlash && (
          <TouchableOpacity style={styles.cameraFilterButton} onPress={toggleFlash}>
            <Ionicons
              name={flash === 'on' ? 'flash' : 'flash-off'}
              color={lightTheme.colors.backgroundContrast}
              size={24}
            />
          </TouchableOpacity>
        )}
      </View>

      <GestureDetector gesture={pinchGesture}>
        <ReanimatedCamera
          ref={cameraRef}
          style={styles.cameraContainer}
          device={device}
          isActive={canCameraBeActive}
          video
          photo
          animatedProps={cameraAnimatedProps}
        />
      </GestureDetector>

      <CaptureButton
        style={styles.captureButton}
        camera={cameraRef}
        onMediaCaptured={onMediaCaptured}
        cameraZoom={zoom}
        minZoom={minZoom}
        maxZoom={maxZoom}
        flash={supportsFlash ? flash : FlashState.Off}
        enabled={canCameraBeActive}
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
  cameraFiltersContainer: {
    flexDirection: 'column',
    position: 'absolute',
    top: 0,
    right: 8,
    backgroundColor: lightTheme.colors.background,
    borderRadius: 25,
    overflow: 'hidden',
  },
  cameraFilterButton: {
    padding: 8,
  },
  cameraFilterButtonText: {},
  captureButton: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 16,
  },
});
