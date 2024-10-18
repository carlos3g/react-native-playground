import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { AppStackParams } from '@/navigation/app.navigator.types';
import { IndexScreen } from '@/screens/app/index-screen';
import { BlurCardsScreen } from '@/screens/animations/blur-cards';

const { Navigator, Screen } = createNativeStackNavigator<AppStackParams>();

const screenOptions: NativeStackNavigationOptions = { headerShown: false };

const AppNavigator: React.FC = () => (
  <Navigator screenOptions={screenOptions} initialRouteName="IndexScreen">
    <Screen component={IndexScreen} name="IndexScreen" />
    <Screen component={BlurCardsScreen} name="BlurCardsScreen" />
  </Navigator>
);

export { AppNavigator };