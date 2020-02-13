import { MutableRefObject, useEffect, useLayoutEffect } from 'react';

export interface GetScrollPositionOptions<T = HTMLElement> {
  element?: MutableRefObject<T> | null;
  useWindow?: boolean;
}

export interface ScrollPosition {
  x: number;
  y: number;
}

export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function getScrollPosition({
  element,
  useWindow = false,
}: GetScrollPositionOptions): ScrollPosition {
  if (typeof window === 'undefined') {
    return { x: 0, y: 0 };
  }

  const target = element ? element.current : document.body;
  const position = target.getBoundingClientRect();

  return useWindow
    ? { x: window.scrollX, y: window.scrollY }
    : { x: position.left, y: position.top };
}
