import { slugify } from '../slugify';

test('Handles invalid arguments', () => {
  const errorMessage = 'Value to slugify must be of type "string"';

  expect(() => slugify()).toThrow(errorMessage);
  expect(() => slugify(null)).toThrow(errorMessage);
  expect(slugify('')).toBe('');
});

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
