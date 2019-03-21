import { filterInt } from '@utils';

interface TruncateOptions {
  /**
   * Text to display at the end of the truncated string. Its length is included
   * in the total length of the returned string. Default is `...`.
   */
  ellipsis?: string;
  /** Total length of the returned string. Default is `25`. */
  maxLength?: number;
}

/** Cuts of a string to a specific length. */
export function truncate(
  /** String to truncate. */
  text: string,
  /** Truncate options. */
  { ellipsis = '...', maxLength = 25 }: TruncateOptions = {
    ellipsis: '...',
    maxLength: 25,
  },
) {
  if (text.length > maxLength && text.length > ellipsis.length) {
    return `${text
      .substr(0, maxLength - ellipsis.length)
      .trimRight()}${ellipsis}`;
  }

  return text;
}

/** Creates a URL-friendly version of a string. */
export function slugify(/** String to slugify. */ text: string) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

/**
 * Returns a valid style length value.
 *
 * @param {string | number} length The length to be formatted.
 * @param {string} unit Unit to append to the length.
 * */
export function styleLengths(length: string | number = 0, unit = 'px') {
  if (typeof length === 'string') {
    if (isNaN(filterInt(length))) {
      return length;
    }
  }

  return `${length}${unit}`;
}
