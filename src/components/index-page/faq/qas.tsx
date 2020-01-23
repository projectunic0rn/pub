import React, { ReactNode } from 'react';

export interface Qa {
  readonly question: string | ReactNode;
  readonly answer: string | ReactNode;
}

export const qas: readonly Qa[] = [
  {
    question: 'Why the name Project Unicorn?',
    answer: (
      <p>
        The name is inspired by the term <em>unicorn developer/programmer</em>.
        A developer is sometimes referred to as a unicorn when they hold a
        diverse range of skills that are incredibly valuable and rare. The
        projects we work on offer an opportunity to glean into other skills you
        might not have - including devops, design, frontend, backend, or other
        skills required to build and ship software.
      </p>
    ),
  },
];
