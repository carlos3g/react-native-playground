import { useEffect, useState } from 'react';
import { AppState } from 'react-native';

export const useAppState = () => {
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const eventSubscription = AppState.addEventListener('change', (state) => {
      setAppState(state);
    });

    return eventSubscription.remove;
  }, []);

  return appState;
};
