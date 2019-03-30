import { makeShareUrl } from '../url-utils';

test('generates correct Facebook share URL', () => {
  const u = 'https://example.website/blog/1';
  const expected = `https://www.facebook.com/sharer/sharer.php?u=${u}`;

  expect(makeShareUrl('facebook', { u })).toBe(expected);
});

test('generates correct LinkedIn share URL', () => {
  const url = 'https://example.website/blog/1';
  const source = 'https://example.website';
  const summary = 'This is the summary';
  const title = 'This is the title';
  let actual = makeShareUrl('linkedin', { url, source, summary, title });

  expect(actual.includes('mini=true')).toBe(true);
  expect(actual.includes(`title=${encodeURIComponent(title)}`)).toBe(true);
  expect(actual.includes(`summary=${encodeURIComponent(summary)}`)).toBe(true);
  expect(actual.includes(`source=${source}`)).toBe(true);

  actual = makeShareUrl('linkedin', {
    url,
    source,
    summary,
    title,
    mini: false,
  });

  expect(actual.includes('mini=false')).toBe(true);
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

  let actual = makeShareUrl('twitter', { url, text, via });

  expect(actual.includes(`url=${url}`)).toBe(true);
  expect(actual.includes(`title=${encodeURIComponent(text)}`)).toBe(true);
  expect(actual.includes(`via=${via}`)).toBe(true);
});
