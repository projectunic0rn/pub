/** Tests a value if it is a number; otherwise return `NaN`. */
export function filterInt(/** The value to be filtered. */ value: string) {
  if (/^(-|\+)?([0-9]+|Infinity)$/.test(value)) {
    return Number(value);
  }

  return NaN;
}
