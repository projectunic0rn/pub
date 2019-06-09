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
  /** Optional title to be displayed below the author's name. */
  readonly title?: string;
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
  {
    quote:
      'Project Unicorn helped me find other people who all share a passion for building software.',
    author: 'Damon Clark',
    title: 'Software Developer',
  },
  {
    quote:
      "Project Unicorn is what I've been looking for for so long, and I'm so grateful to be a part of it.",
    author: 'Aaron Garton',
    title: 'Software Developer',
  },
];
