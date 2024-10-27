// See: https://reactnavigation.org/docs/typescript

import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';

export type AppStackParams = {
  IndexScreen: undefined;

  // animations
  BlurCardsScreen: undefined;
  RainbowSpinnerScreen: undefined;
  GradientClock: undefined;
  ChasingBubblesScreen: undefined;
  Animated3DCard: undefined;
  ControlledBall: undefined;
  ExpandableCard: undefined;
  Counter: undefined;
  AnimatedSensor: undefined;
  Neurons: undefined;
  MirroredGlobe: undefined;
  BareRecording: undefined;
  D3LineChart: undefined;
  FadeCarouselTransition: undefined;
};

// Helpers
export type AppStackScreenProps<T extends keyof AppStackParams> = NativeStackScreenProps<AppStackParams, T>;
export type AppStackNavigationProp<T extends keyof AppStackParams> = NativeStackNavigationProp<AppStackParams, T>;
export type AppStackRouteProp<T extends keyof AppStackParams> = RouteProp<AppStackParams, T>;
