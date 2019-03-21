import { filterInt } from '../number-utils';

describe('filterInt', () => {
  test('parses number correctly', () => {
    expect(filterInt('421')).toBe(421);
    expect(filterInt('-421')).toBe(-421);
    expect(filterInt('+421')).toBe(421);
    expect(filterInt('Infinity')).toBe(Infinity);
    expect(filterInt('421e+0')).toBeNaN();
    expect(filterInt('421hop')).toBeNaN();
    expect(filterInt('hop1.61803398875')).toBeNaN();
    expect(filterInt('1.61803398875')).toBeNaN();
  });
});
