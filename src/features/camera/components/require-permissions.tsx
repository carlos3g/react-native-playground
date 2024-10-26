import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useCameraPermission } from 'react-native-vision-camera';
import { $fontFamily, $fontSizes, lightTheme } from '@/shared/theme/theme';
import { Button } from '@/shared/components/ui/button';
import type { AppStackNavigationProp } from '@/navigation/app.navigator.types';

interface RequirePermissionsProps {}

export const RequirePermissions: React.FC<RequirePermissionsProps> = () => {
  const { goBack } = useNavigation<AppStackNavigationProp<'BareRecording'>>();

  const { hasPermission: hasCameraPermission, requestPermission: requestCameraPermission } = useCameraPermission();

  useEffect(() => {
    if (hasCameraPermission) {
      goBack();
    }
  }, [goBack, hasCameraPermission]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Camera permissions are required</Text>

      <Button
        disabled={hasCameraPermission}
        title="Grant camera permission"
        onPress={requestCameraPermission}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: lightTheme.colors.background,
    paddingHorizontal: 16,
    gap: 8,
  },
  text: {
    color: lightTheme.colors.backgroundContrast,
    fontFamily: $fontFamily.bold,
    fontSize: $fontSizes.paragraphLarge.fontSize,
    lineHeight: $fontSizes.paragraphLarge.lineHeight,
  },
  button: {
    width: '100%',
  },
});
