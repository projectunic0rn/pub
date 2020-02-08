import { noop } from '../general-utils';

test('does nothing', () => {
  expect(noop()).toBeUndefined();
});
