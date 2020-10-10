/**
 * @jest-environment node
 */
import {
  getScrollPosition,
  getNavigatorInfo,
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
} from '../browser-utils';

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

test('returns empty object from local storage if window is undefined', () => {
  // Arrange
  // Act
  const item = { name: 'test' };
  setLocalStorage<{ name: string }>('key', item);
  const returnedItem = getLocalStorage<{ name: string }>('key');
  // Assert
  expect(returnedItem).toBeDefined();
  expect(returnedItem).toEqual({});
});

test('does not remove object from local storage if window is undefined', () => {
  // Arrange
  // Act
  const item = { name: 'test' };
  setLocalStorage<{ name: string }>('key', item);
  removeLocalStorage('key');
  const returnedItem = getLocalStorage('key');

  // Assert
  expect(returnedItem).toBeDefined();
  expect(returnedItem).toEqual({});
});
