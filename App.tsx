import '@/lib/i18n';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

import {
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
  useFonts,
} from '@expo-google-fonts/poppins';
import { QueryClientProvider } from '@tanstack/react-query';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Host } from 'react-native-portalize';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Toaster } from 'sonner-native';
import { StatusBar } from 'expo-status-bar';
import { RootNavigator } from '@/navigation';
import { queryClient } from '@/lib/react-query';

void SplashScreen.preventAutoHideAsync();

const App = gestureHandlerRootHOC(() => {
  const [loaded, error] = useFonts({
    'Poppins-Thin': Poppins_100Thin,
    'Poppins-ThinItalic': Poppins_100Thin_Italic,
    'Poppins-ExtraLight': Poppins_200ExtraLight,
    'Poppins-ExtraLightItalic': Poppins_200ExtraLight_Italic,
    'Poppins-Light': Poppins_300Light,
    'Poppins-LightItalic': Poppins_300Light_Italic,
    'Poppins-Regular': Poppins_400Regular,
    'Poppins-RegularItalic': Poppins_400Regular_Italic,
    'Poppins-Medium': Poppins_500Medium,
    'Poppins-MediumItalic': Poppins_500Medium_Italic,
    'Poppins-SemiBold': Poppins_600SemiBold,
    'Poppins-SemiBoldItalic': Poppins_600SemiBold_Italic,
    'Poppins-Bold': Poppins_700Bold,
    'Poppins-BoldItalic': Poppins_700Bold_Italic,
    'Poppins-ExtraBold': Poppins_800ExtraBold,
    'Poppins-ExtraBoldItalic': Poppins_800ExtraBold_Italic,
    'Poppins-Black': Poppins_900Black,
    'Poppins-BlackItalic': Poppins_900Black_Italic,
  });

  useEffect(() => {
    if (loaded || error) {
      void SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <Host>
          <StatusBar style="dark" />
          <RootNavigator />
        </Host>
        <Toaster />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
});

export default App;
