import { useEffect, useState } from 'react';
type Dimensions = {
  width: number;
  height: number;
};

export const useWindowDimensions = () => {
  const [state, setState] = useState<Dimensions | null>(
    /* Set the initial state to null - this will be run on the server
     * which does not have a width or height! The initial useEffect
     * will return the actual browser dimensions. */
    null,
  );

  useEffect(() => {
    let timer: NodeJS.Timeout;
    /* Debounce updating state for 150ms */
    const debouncedHandleResize = () => {
      timer = setTimeout(() => {
        setState({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, 150);
    };
    window.addEventListener('resize', debouncedHandleResize);
    debouncedHandleResize();
    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener('resize', debouncedHandleResize);
    };
  }, []);
  return state;
};
