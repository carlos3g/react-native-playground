import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from '@/navigation/app.navigator';

const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export { RootNavigator };
