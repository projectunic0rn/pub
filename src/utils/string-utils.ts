interface TruncateOptions {
  ellipsis?: string;
  maxLength?: number;
}

export function truncate(
  text: string,
  { ellipsis = '...', maxLength = 25 }: TruncateOptions = {
    ellipsis: '...',
    maxLength: 25,
  },
) {
  if (text.length > maxLength) {
    return `${text
      .substr(0, maxLength - ellipsis.length)
      .trimRight()}${ellipsis}`;
  }

  return text;
}

export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}
