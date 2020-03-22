import { slugify, truncate, styleLengths, borderStyle } from '../string-utils';

describe('truncate', () => {
  test('Default maxLength value', () => {
    const actual = [
      'Test One',
      'Test Two: The quick brown fox jumps over the lazy dog.',
      'Test Three: Right pad ded string',
    ].map((v) => truncate(v));
    const expected = [
      'Test One',
      'Test Two: The quick br...',
      'Test Three: Right pad...',
    ];

    expect(actual).toEqual(expect.arrayContaining(expected));
  });

  test('With maxLength', () => {
    expect(truncate('the', { maxLength: 3 })).toBe('the');
    expect(truncate('Max Length 10', { maxLength: 10 })).toBe('Max Len...');
  });

  test('With custom ellipsis', () => {
    let ellipsis = '---';

    expect(truncate('abc', { ellipsis })).toBe('abc');
    expect(truncate('test alpha: lorem ipsum dolor', { ellipsis })).toBe(
      'test alpha: lorem ipsu---',
    );

    ellipsis = '----------------------------';

    expect(truncate('test beta: lorem ipsum dolor', { ellipsis })).toBe(
      'test beta: lorem ipsum dolor',
    );
  });
});

describe('slugify', () => {
  test('Return correct slugged value', () => {
    const actual = [
      'test a',
      'test@#!(@*&#)b',
      ' tes t c ',
      '-test--d-',
      'test---e',
      't!e@s#t$f',
      'Test G',
      'tEstH',
    ].map((v) => slugify(v));
    const expected = [
      'test-a',
      'testb',
      'tes-t-c',
      'test-d',
      'test-e',
      'testf',
      'test-g',
      'testh',
    ];

    expect(actual).toEqual(expect.arrayContaining(expected));
  });
});

describe('styleLengths', () => {
  test('return correct unit depending on input type', () => {
    const expected = '10px';

    expect(styleLengths()).toBe('0px');
    expect(styleLengths(10)).toBe(expected);
    expect(styleLengths('10px')).toBe(expected);
    expect(styleLengths(10, 'px')).toBe(expected);
  });

  test('does not append a unit for value with trailing letters', () => {
    const expected = '1023s';

    expect(styleLengths('1023s')).toBe(expected);
  });
});

describe('borderStyle', () => {
  test('return correct border style', () => {
    let actual = borderStyle({
      color: 'red',
      style: 'solid',
      width: '1em',
    });

    expect(actual).toBe('1em solid red');

    actual = borderStyle({
      color: 'red',
      style: 'solid',
      width: 20,
    });

    expect(actual).toBe('20px solid red');
  });
});
