import { useState } from 'react';
import { useThrottleCallback } from '@react-hook/throttle';

export const useThrottle = <StateType>(initialState: StateType, wait: number, leading = false): [StateType, any] => {
  const [state, setState] = useState(initialState);
  return [state, useThrottleCallback(setState, wait, leading)];
};
