import * as React from 'react';

import { avatarRmjordas } from '../assets';

export interface Content {
  /**
   * The quote can either be a plain string or a React node. Use a React node to
   * be able to use `em`, `strong`, etc..
   */
  readonly quote: string | React.ReactNode;
  /** Name of the author of the quote. */
  readonly author: string;
  /** Title to be displayed below the author's name. */
  readonly title: string;
  /**
   * The image associated with the author of the quote. If not provided, a
   * default image will be used.
   */
  readonly avatar?: string;
}

export const content: readonly Content[] = [
  {
    quote:
      'Project Unicorn gave me an opportunity to contribute to interesting projects.',
    author: 'Rodger Jordas',
    title: 'Software Developer',
    avatar: avatarRmjordas,
  },
];
