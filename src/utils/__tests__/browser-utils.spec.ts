/**
 * @jest-environment node
 */
import { getScrollPosition } from '../browser-utils';

test('returns default value if not in browser environment', () => {
  const actual = getScrollPosition({});

  expect(actual.x).toBe(0);
  expect(actual.y).toBe(0);
});
