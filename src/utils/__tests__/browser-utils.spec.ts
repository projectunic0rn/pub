/**
 * @jest-environment node
 */
import { getScrollPosition, getNavigatorInfo } from '../browser-utils';

test('returns default value if not in browser environment', () => {
  const actual = getScrollPosition({});

  expect(actual.x).toBe(0);
  expect(actual.y).toBe(0);
});

test('returns NavigatorInfo with userAgent key', () => {
  // Arrange
  // Act
  const actual = getNavigatorInfo();
  // Assert
  expect('userAgent' in actual).toBeTruthy();
});

test('returns NavigatorInfo with empty user agent if not in browser environment', () => {
  // Arrange
  // Act
  const actual = getNavigatorInfo();
  // Assert
  expect(actual.userAgent).toBe('');
});
