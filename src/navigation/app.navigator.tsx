import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { AppStackParams } from '@/navigation/app.navigator.types';
import { Animated3DCard } from '@/screens/animations/animated-3d-card';
import { AnimatedSensor } from '@/screens/animations/animated-sensor';
import { BlurCardsScreen } from '@/screens/animations/blur-cards';
import { ChasingBubblesScreen } from '@/screens/animations/chasing-bubbles';
import { Counter } from '@/screens/animations/counter';
import { GradientClock } from '@/screens/animations/gradient-clock';
import { RainbowSpinnerScreen } from '@/screens/animations/rainbow-spinner';
import { IndexScreen } from '@/screens/app/index-screen';
import { BareRecording } from '@/screens/camera/bare-recording';
import { D3LineChart } from '@/screens/charts/d3-line-chart';
import { ControlledBall } from '@/screens/gestures/controlled-ball';
import { ExpandableCard } from '@/screens/gestures/expandable-card';
import { MirroredGlobe } from '@/screens/shaders/mirrored-globe';
import { Neurons } from '@/screens/shaders/neurons';
import { FadeCarouselTransition } from '@/screens/animations/fade-carousel-transition';
import { FloatingHearts } from '@/screens/animations/floating-hearts';
import { WaveAnimation } from '@/screens/animations/wave-animation';
import { InvertColors } from '@/screens/camera/invert-colors';
import { LikeButton } from '@/screens/micro-interactions/like-button';

const { Navigator, Screen } = createNativeStackNavigator<AppStackParams>();

const screenOptions: NativeStackNavigationOptions = { headerShown: false };

const AppNavigator: React.FC = () => (
  <Navigator screenOptions={screenOptions} initialRouteName="IndexScreen">
    <Screen component={IndexScreen} name="IndexScreen" />

    <Screen component={BlurCardsScreen} name="BlurCardsScreen" />
    <Screen component={RainbowSpinnerScreen} name="RainbowSpinnerScreen" />
    <Screen component={GradientClock} name="GradientClock" />
    <Screen component={ChasingBubblesScreen} name="ChasingBubblesScreen" />
    <Screen component={Animated3DCard} name="Animated3DCard" />
    <Screen component={FadeCarouselTransition} name="FadeCarouselTransition" />
    <Screen component={FloatingHearts} name="FloatingHearts" />
    <Screen component={WaveAnimation} name="WaveAnimation" />
    <Screen component={InvertColors} name="InvertColors" />

    <Screen component={ControlledBall} name="ControlledBall" />
    <Screen component={ExpandableCard} name="ExpandableCard" />
    <Screen component={Counter} name="Counter" />
    <Screen component={AnimatedSensor} name="AnimatedSensor" />

    <Screen component={Neurons} name="Neurons" />
    <Screen component={MirroredGlobe} name="MirroredGlobe" />

    <Screen component={LikeButton} name="LikeButton" />

    <Screen component={D3LineChart} name="D3LineChart" />

    <Screen component={BareRecording} name="BareRecording" />
  </Navigator>
);

export { AppNavigator };
