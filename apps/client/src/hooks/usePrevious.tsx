import { useRef, useEffect } from 'react';

const usePrevious = (value: any): any => {
  const ref = useRef(null);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

export default usePrevious;
