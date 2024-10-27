import type { FC } from 'react';
import type { ListRenderItem, NativeScrollEvent } from 'react-native';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { images } from '@/screens/animations/fade-carousel-transition/data';
import { AnimatedBackgroundImage } from '@/screens/animations/fade-carousel-transition/animated-background-image';

const { width: WindowWidth, height: WindowHeight } = Dimensions.get('window');

const keyExtractor: (item: string) => string = (item) => item;

const renderItem: ListRenderItem<string> = ({ item }) => (
  <View style={styles.flatListContentWrapper}>
    <Image style={styles.image} source={{ uri: item }} />
  </View>
);

interface FadeCarouselTransitionProps {}

export const FadeCarouselTransition: FC<FadeCarouselTransitionProps> = () => {
  const scrollX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((e: NativeScrollEvent) => {
    scrollX.value = e.contentOffset.x;
  });

  return (
    <View style={styles.container}>
      {images.map((img, i) => (
        <AnimatedBackgroundImage scrollX={scrollX} index={i} uri={img} key={img} />
      ))}

      <Animated.FlatList
        onScroll={scrollHandler}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        initialNumToRender={1}
        maxToRenderPerBatch={5}
        windowSize={7}
        data={images}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContentWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: WindowWidth,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 20,
  },
  image: {
    width: WindowWidth * 0.7,
    height: WindowHeight * 0.54,
    borderRadius: 16,
  },
});
