import type React from 'react';
import { memo, useCallback, useRef } from 'react';
import type { ViewProps } from 'react-native';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import type { SharedValue } from 'react-native-reanimated';
import Reanimated, {
  cancelAnimation,
  Easing,
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { Camera, PhotoFile, VideoFile } from 'react-native-vision-camera';
import { CaptureType } from '@/features/camera/enums';
import type { FlashState } from '@/features/camera/enums';
import { CameraRefIsNullException } from '@/features/camera/exceptions';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const CAPTURE_BUTTON_SIZE = 78;
const START_RECORDING_DELAY = 200;
const BORDER_WIDTH = CAPTURE_BUTTON_SIZE * 0.1;

interface CaptureButtonProps extends ViewProps {
  camera: React.RefObject<Camera>;
  onMediaCaptured: (media: PhotoFile | VideoFile, type: CaptureType) => void;

  minZoom: number;
  maxZoom: number;
  cameraZoom: SharedValue<number>;

  flash: FlashState;

  enabled: boolean;
}

export const CaptureButton: React.FC<CaptureButtonProps> = memo((props) => {
  const { camera, onMediaCaptured, minZoom, maxZoom, cameraZoom, flash, enabled, style, ...rest } = props;

  const pressDownDate = useRef<Date | undefined>(undefined);
  const isRecording = useRef(false);
  const recordingProgress = useSharedValue(0);
  const isPressingButton = useSharedValue(false);

  const { bottom } = useSafeAreaInsets();

  const takePhoto = useCallback(async () => {
    try {
      if (camera.current == null) throw new CameraRefIsNullException();

      const photo = await camera.current.takePhoto({
        flash,
        enableShutterSound: false,
      });
      onMediaCaptured(photo, CaptureType.Photo);
    } catch (e) {
      console.error('Failed to take photo!', e);
    }
  }, [camera, flash, onMediaCaptured]);

  const onStoppedRecording = useCallback(() => {
    isRecording.current = false;
    cancelAnimation(recordingProgress);
  }, [recordingProgress]);

  const stopRecording = useCallback(async () => {
    try {
      if (camera.current == null) throw new CameraRefIsNullException();

      await camera.current.stopRecording();
    } catch (e) {
      console.error('failed to stop recording!', e);
    }
  }, [camera]);

  const startRecording = useCallback(() => {
    try {
      if (camera.current == null) throw new CameraRefIsNullException();

      camera.current.startRecording({
        flash,
        onRecordingError: () => {
          onStoppedRecording();
        },
        onRecordingFinished: (video) => {
          onMediaCaptured(video, CaptureType.Video);
          onStoppedRecording();
        },
      });

      isRecording.current = true;
    } catch (e) {}
  }, [camera, flash, onMediaCaptured, onStoppedRecording]);

  const shadowStyle = useAnimatedStyle(
    () => ({
      transform: [
        {
          scale: withSpring(isPressingButton.value ? 1 : 0, {
            mass: 1,
            damping: 35,
            stiffness: 300,
          }),
        },
      ],
    }),
    [isPressingButton]
  );

  const buttonStyle = useAnimatedStyle(() => {
    const resolveScale = () => {
      if (enabled) {
        if (isPressingButton.value) {
          return withRepeat(
            withSpring(1, {
              stiffness: 100,
              damping: 1000,
            }),
            -1,
            true
          );
        }

        return withSpring(0.9, {
          stiffness: 500,
          damping: 300,
        });
      }

      return withSpring(0.6, {
        stiffness: 500,
        damping: 300,
      });
    };

    return {
      opacity: withTiming(enabled ? 1 : 0.3, {
        duration: 100,
        easing: Easing.linear,
      }),
      transform: [
        {
          scale: resolveScale(),
        },
      ],
    };
  }, [enabled, isPressingButton]);

  const tapGesture = Gesture.Tap()
    .enabled(enabled)
    .maxDuration(99999999)
    .shouldCancelWhenOutside(false)
    .runOnJS(true)
    .onBegin(() => {
      recordingProgress.value = 0;
      isPressingButton.value = true;
      const now = new Date();
      pressDownDate.current = now;

      setTimeout(() => {
        if (pressDownDate.current === now) {
          startRecording();
        }
      }, START_RECORDING_DELAY);
    })
    .onFinalize(async () => {
      try {
        if (pressDownDate.current == null) throw new Error('PressDownDate ref .current was null!');
        const now = new Date();
        const diff = now.getTime() - pressDownDate.current.getTime();
        pressDownDate.current = undefined;
        if (diff < START_RECORDING_DELAY) {
          await takePhoto();
        } else {
          await stopRecording();
        }
      } finally {
        setTimeout(() => {
          isPressingButton.value = false;
        }, 500);
      }
    });

  const offsetYCtx = useSharedValue(0);
  const startYCtx = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .enabled(enabled)
    .failOffsetX([-SCREEN_WIDTH, SCREEN_WIDTH])
    .activeOffsetY([-2, 2])
    .onStart((event) => {
      startYCtx.value = event.absoluteY;
      const yForFullZoom = startYCtx.value * 0.7;
      const offsetYForFullZoom = startYCtx.value - yForFullZoom;

      offsetYCtx.value = interpolate(
        cameraZoom.value,
        [minZoom, maxZoom],
        [0, offsetYForFullZoom],
        Extrapolation.CLAMP
      );
    })
    .onChange((event) => {
      const offset = offsetYCtx.value ?? 0;
      const startY = startYCtx.value ?? SCREEN_HEIGHT;
      const yForFullZoom = startY * 0.7;

      cameraZoom.value = interpolate(
        event.absoluteY - offset,
        [yForFullZoom, startY],
        [maxZoom, minZoom],
        Extrapolation.CLAMP
      );
    });

  return (
    <GestureDetector gesture={Gesture.Simultaneous(tapGesture, panGesture)}>
      <Reanimated.View {...rest} style={[buttonStyle, style, { marginBottom: bottom }]}>
        <Reanimated.View style={styles.flex}>
          <Reanimated.View style={[styles.shadow, shadowStyle]} />
          <View style={styles.button} />
        </Reanimated.View>
      </Reanimated.View>
    </GestureDetector>
  );
});

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  shadow: {
    position: 'absolute',
    width: CAPTURE_BUTTON_SIZE,
    height: CAPTURE_BUTTON_SIZE,
    borderRadius: CAPTURE_BUTTON_SIZE / 2,
    backgroundColor: '#e34077',
  },
  button: {
    width: CAPTURE_BUTTON_SIZE,
    height: CAPTURE_BUTTON_SIZE,
    borderRadius: CAPTURE_BUTTON_SIZE / 2,
    borderWidth: BORDER_WIDTH,
    borderColor: 'white',
  },
});
