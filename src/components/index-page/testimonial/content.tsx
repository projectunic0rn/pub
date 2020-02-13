import { ReactNode } from 'react';

import { avatarRmjordas, avatarRmoran } from '../assets';

export interface Content {
  /**
   * The quote can either be a plain string or a React node. Use a React node to
   * be able to use `em`, `strong`, etc..
   */
  readonly quote: string | ReactNode;
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
      "Project Unicorn has been the perfect online community to collaborate with developers. The information and knowledge I have gained from this community is invaluable - from improving my coding skills to learning how to work on projects with others - all of which I can put on my resume. Project Unicorn is what I've been looking for for so long, and I'm so grateful to be a part of it.",
    author: 'Aaron Garton',
    title: 'Software Developer',
  },
  {
    quote:
      'Project Unicorn has been an awesome opportunity to lead remote teams and build awesome software.',
    author: 'Roy Moran',
    title: 'Software Developer',
    avatar: avatarRmoran,
  },
  {
    quote:
      'Project Unicorn is an excellent way to get experience working in a team environment without the pressure and costs of the working world. This allows people to learn from their more-experienced teammates while still contributing at their own pace.',
    author: 'GreenWithMV',
    title: 'Software Developer',
  },
];
