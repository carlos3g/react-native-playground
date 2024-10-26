import { useState } from 'react';
import type { CameraPosition } from 'react-native-vision-camera';

export const useCameraFlip = () => {
  const [cameraPosition, setCameraPosition] = useState<CameraPosition>('back');

  const toggleCameraFlip = () => {
    setCameraPosition((pS) => (pS === 'back' ? 'front' : 'back'));
  };

  return { cameraPosition, toggleCameraFlip };
};
