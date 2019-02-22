import { slugify, truncate } from '../string-utils';

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
