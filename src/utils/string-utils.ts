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
