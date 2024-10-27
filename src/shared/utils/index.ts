export const clamp = (val: number, min: number, max: number) => {
  'worklet';

  return Math.min(Math.max(val, min), max);
};

export const snap = (value: number, min: number, max: number): number => {
  'worklet';

  const distanceToMin = Math.abs(value - min);
  const distanceToMax = Math.abs(value - max);

  return distanceToMin < distanceToMax ? min : max;
};

export const lerp = (value: number, min: number, max: number): number => {
  'worklet';

  return (max - min) * value + min;
};

export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
