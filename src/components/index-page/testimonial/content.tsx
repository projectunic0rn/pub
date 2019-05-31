import * as React from 'react';

import { avatarRmjordas } from '../assets';

export interface Content {
  readonly quote: string | React.ReactNode;
  readonly author: string;
  readonly title: string;
  readonly avatar: string;
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
