import { useCallback, useLayoutEffect, useRef, useState } from 'react';

const throttle = (fn: () => any, delay: number) => {
  let time = Date.now();

  return () => {
    if (time + delay - Date.now() <= 0) {
      fn();
      time = Date.now();
    }
  };
};

type RectResult = {
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
} | null;

const getRect = (element: HTMLElement | null): RectResult | null => {
  if (!element) return null;
  return element.getBoundingClientRect();
};

export const useRect = (): [
  RectResult,
  React.MutableRefObject<HTMLDivElement | null>,
] => {
  const ref = useRef<HTMLDivElement | null>(null);
  const current = ref.current || null;
  const [rect, setRect] = useState(getRect(current));

  const handleResize = useCallback(() => {
    if (!ref.current) return;
    // Update client rect
    setRect(getRect(ref.current));
  }, [ref]);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    handleResize();
    const throttledHandleResize = throttle(handleResize, 100);

    window.addEventListener('scroll', throttledHandleResize);
    window.addEventListener('resize', throttledHandleResize);

    return () => {
      window.removeEventListener('scroll', throttledHandleResize);
      window.removeEventListener('resize', throttledHandleResize);
    };
  }, [handleResize]);

  return [rect, ref];
};
