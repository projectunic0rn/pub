/**
 * Tests a value if it is a number; otherwise return `NaN`.
 *
 * @param {string} value The value to be filtered.
 * */
export function filterInt(value: string) {
  if (/^(-|\+)?([0-9]+|Infinity)$/.test(value)) {
    return Number(value);
  }

  return NaN;
}
