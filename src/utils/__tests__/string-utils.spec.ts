import { slugify, truncate } from '../string-utils';

test('Truncates a string properly', () => {
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

test('Return correct slugged value', () => {
  const actual = [
    'test a',
    'test@#!(@*&#)b',
    ' tes t c ',
    '-test--d-',
    'test---e',
    't!e@s#t$f',
  ].map((v) => slugify(v));
  const expected = ['test-a', 'testb', 'tes-t-c', 'test-d', 'test-e', 'testf'];

  expect(actual).toEqual(expect.arrayContaining(expected));
});
