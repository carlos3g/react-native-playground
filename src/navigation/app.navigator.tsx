import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { AppStackParams } from '@/navigation/app.navigator.types';
import { IndexScreen } from '@/screens/app/index-screen';
import { BlurCardsScreen } from '@/screens/animations/blur-cards';
import { RainbowSpinnerScreen } from '@/screens/animations/rainbow-spinner';
import { GradientClock } from '@/screens/animations/gradient-clock';

const { Navigator, Screen } = createNativeStackNavigator<AppStackParams>();

const screenOptions: NativeStackNavigationOptions = { headerShown: false };

const AppNavigator: React.FC = () => (
  <Navigator screenOptions={screenOptions} initialRouteName="IndexScreen">
    <Screen component={IndexScreen} name="IndexScreen" />

    <Screen component={BlurCardsScreen} name="BlurCardsScreen" />
    <Screen component={RainbowSpinnerScreen} name="RainbowSpinnerScreen" />
    <Screen component={GradientClock} name="GradientClock" />
  </Navigator>
);

export { AppNavigator };
