import { MutableRefObject, useRef, useCallback, DependencyList } from 'react';

import {
  ScrollPosition,
  getScrollPosition,
  useIsomorphicLayoutEffect,
} from '@utils/browser-utils';

export interface ScrollProps {
  prevPos: ScrollPosition;
  currPos: ScrollPosition;
}

type UseScrollPosition = (
  effect: (props: ScrollProps) => void,
  deps?: DependencyList,
  element?: MutableRefObject<HTMLElement> | null,
  useWindow?: boolean,
  wait?: number | null,
) => void;

export const useScrollPosition: UseScrollPosition = (
  effect,
  deps = [],
  element = null,
  useWindow = false,
  wait = null,
) => {
  const positionRef = useRef(getScrollPosition({ useWindow }));
  const throttleTimeoutRef = useRef<number | null>(null);

  const callback = useCallback(() => {
    const currPos = getScrollPosition({ element, useWindow });

    effect({ prevPos: positionRef.current, currPos });
    positionRef.current = currPos;
    throttleTimeoutRef.current = null;
  }, [effect, element, useWindow]);

  const handleScroll = useCallback(() => {
    if (wait) {
      if (throttleTimeoutRef.current === null) {
        throttleTimeoutRef.current = setTimeout(callback, wait);
      }

      return;
    }

    callback();
  }, [callback, wait]);

  useIsomorphicLayoutEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, deps);
};
