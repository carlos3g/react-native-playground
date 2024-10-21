export const clamp = (val: number, min: number, max: number) => {
  'worklet';

  return Math.min(Math.max(val, min), max);
};

export const toTheNearest = (value: number, min: number, max: number): number => {
  'worklet';

  const distanceToMin = Math.abs(value - min);
  const distanceToMax = Math.abs(value - max);

  return distanceToMin < distanceToMax ? min : max;
};
