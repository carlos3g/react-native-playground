import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { lightTheme } from '@/shared/theme/theme';
import { Heart } from '@/screens/animations/floating-hearts/heart';

interface IHeart {
  id: number;
}

interface FloatingHeartsProps {}

export const FloatingHearts: React.FC<FloatingHeartsProps> = () => {
  const [hearts, setHearts] = useState<IHeart[]>([]);

  const handleAddHeart = () => {
    setHearts((pS) => [...pS, { id: Math.random() }]);
  };

  const handleRemoveHeart = (id: number) => {
    setHearts((pS) => pS.filter((h) => h.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      {hearts.length > 0 && hearts.map(({ id }) => <Heart key={id} onComplete={() => handleRemoveHeart(id)} />)}

      <TouchableOpacity style={styles.fab} onPress={handleAddHeart}>
        <Ionicons name="heart" color="white" size={40} style={styles.fabHeartIcon} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightTheme.colors.background,
    paddingBottom: 16,
  },
  fab: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 56,
    aspectRatio: 1,
    borderRadius: 28,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabHeartIcon: {
    marginBottom: -2,
  },
});
