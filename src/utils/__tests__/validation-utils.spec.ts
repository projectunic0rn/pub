import {
  isEmptyString,
  isEmptyArray,
  isValidUrl,
  isValidEmail,
  isValidPassword,
  isPasswordMatch,
} from '../validation-utils';

test('isEmptyString', () => {
  expect(isEmptyString('')).toBe(true);
  expect(isEmptyString('foo')).toBe(false);
});

test('isEmptyArray', () => {
  expect(isEmptyArray([])).toBe(true);
  expect(isEmptyArray(['foo'])).toBe(false);
  expect(isEmptyArray([1, 2, 3])).toBe(false);
  expect(isEmptyArray([{}])).toBe(false);
});

describe('isValidUrl', () => {
  test('Without test strings', () => {
    expect(isValidUrl('')).toBe(false);
    expect(isValidUrl('google.com')).toBe(false);
    expect(isValidUrl('http://localhost')).toBe(true);
    expect(isValidUrl('http://google.com')).toBe(true);
    expect(isValidUrl('https://google.com')).toBe(true);
    expect(isValidUrl('https://google.com/')).toBe(true);
    expect(isValidUrl('https://google.com/?s=yeah+boi')).toBe(true);
    expect(isValidUrl('https://google.com/?s=yeah+boi&p=nice')).toBe(true);
    expect(isValidUrl('https://www.google.com')).toBe(true);
    expect(isValidUrl('https://www.google.com#hash')).toBe(true);
    expect(isValidUrl('https://www.google.com/#hash')).toBe(true);
    expect(isValidUrl('https://www.google.com/?test=1#hash')).toBe(true);
    expect(isValidUrl('https://projectunicorn.dev')).toBe(true);
    expect(isValidUrl('https://google.com', [])).toBe(true);
  });

  test('With test strings', () => {
    expect(isValidUrl('https://google.com', ['discord', 'slack'])).toBe(false);
    expect(isValidUrl('https://discord.com', ['discord', 'slack'])).toBe(true);
    expect(isValidUrl('https://slack.com', ['discord', 'slack'])).toBe(true);
  });
});

test('isValidEmail', () => {
  expect(isValidEmail('')).toBe(false);
  expect(isValidEmail('google.com')).toBe(false);
  expect(isValidEmail('google@com')).toBe(false);
  expect(isValidEmail('foo@bar@email.test')).toBe(false);
  expect(isValidEmail('foo@email.t')).toBe(false);
  expect(isValidEmail('foo@e.t')).toBe(false);
  expect(isValidEmail('https://foo@email.test')).toBe(false);
  expect(isValidEmail('mail:foo@email.test')).toBe(false);
  expect(isValidEmail('foo@email.test')).toBe(true);
  expect(isValidEmail('foo@bar.email.test')).toBe(true);
  expect(isValidEmail('foo.bar@email.test')).toBe(true);
  expect(isValidEmail('foo-bar@email.test')).toBe(true);
  expect(isValidEmail('foo-bar@email.test')).toBe(true);
});

test('isValidPassword', () => {
  expect(isValidPassword('')).toBe(false);
  expect(isValidPassword('!@#$%^&*()')).toBe(false);
  expect(isValidPassword('five5')).toBe(false);
  expect(isValidPassword('111111')).toBe(false);
  expect(isValidPassword('a11111')).toBe(true);
  expect(isValidPassword('password')).toBe(true);
  expect(isValidPassword('PASSWORD')).toBe(true);
  expect(isValidPassword('abc123')).toBe(true);
  expect(isValidPassword(`a!@#$%^&*()?_<>/\{};:+=-\`~`)).toBe(true);
  expect(isValidPassword('a'.repeat(20000))).toBe(true);
});

test('isPasswordMatch', () => {
  expect(isPasswordMatch('', '')).toBe(true);
  expect(isPasswordMatch('foo', 'foo')).toBe(true);
  expect(isPasswordMatch('foo', 'bar')).toBe(false);
});
