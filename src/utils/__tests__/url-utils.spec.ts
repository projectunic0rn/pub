import { makeShareUrl } from '../url-utils';

test('generates correct Facebook share URL', () => {
  const u = 'https://example.website/blog/1';
  const expected = `https://www.facebook.com/sharer/sharer.php?u=${u}`;

  expect(makeShareUrl('facebook', { u })).toBe(expected);
});

test('generates correct LinkedIn share URL', () => {
  const url = 'https://example.website/blog/1';
  const actual = makeShareUrl('linkedin', { url });

  expect(actual.includes(`url=${encodeURIComponent(url)}`)).toBe(true);
});

test('generates correct Reddit share URL', () => {
  const url = 'https://example.website/blog/1';
  const expected = `https://www.reddit.com/submit?url=${url}`;

  expect(makeShareUrl('reddit', { url })).toBe(expected);
});

test('generates correct Twitter share URL', () => {
  const url = 'https://example.website/blog/1';
  const text = 'The quick brown fox';
  const via = 'twitteruser';

  const actual = makeShareUrl('twitter', { url, text, via });

  expect(actual.includes(`url=${url}`)).toBe(true);
  expect(actual.includes(`text=${encodeURIComponent(text)}`)).toBe(true);
  expect(actual.includes(`via=${via}`)).toBe(true);
});
