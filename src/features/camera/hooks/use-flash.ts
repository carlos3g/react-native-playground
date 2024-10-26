import { useState } from 'react';
import { FlashState } from '@/features/camera/enums';

export const useFlash = () => {
  const [flash, setFlash] = useState<FlashState>(FlashState.Off);

  const toggleFlash = () => {
    setFlash((pS) => (pS === FlashState.Off ? FlashState.On : FlashState.Off));
  };

  return { flash, toggleFlash };
};
