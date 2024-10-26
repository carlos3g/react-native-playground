import { useIsFocused } from '@react-navigation/native';
import { useAppState } from '@/shared/hooks/use-app-state';

// see: https://react-native-vision-camera.com/docs/guides/lifecycle
export const useCanCameraBeActive = () => {
  const isFocused = useIsFocused();
  const appState = useAppState();
  const canCameraBeActive = isFocused && appState === 'active';

  return { canCameraBeActive };
};
