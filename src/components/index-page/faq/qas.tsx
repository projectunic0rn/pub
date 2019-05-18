import * as React from 'react';

export interface Qa {
  readonly question: string | React.ReactNode;
  readonly answer: string | React.ReactNode;
}

export const qas: readonly Qa[] = [
  {
    question: 'Why the name Project Unicorn?',
    answer: (
      <React.Fragment>
        <p>
          The name is inspired by the term unicorn developer/programmer. A
          developer is sometimes referred to as a unicorn when they hold a
          diverse range of skills that are incredibly valuable and rare. The
          projects we work on offer an opportunity to glean into other skills
          you might not have - including devops, design, frontend, backend, or
          other skills required to build and ship software.
        </p>
      </React.Fragment>
    ),
  },
  {
    question: (
      <>
        Sed libero odio, volutpat <code>et faucibus euismod</code>, maximus a
        diam?
      </>
    ),
    answer: (
      <>
        <p>
          Aliquam est ex, <code>finibus vitae sodales</code> eget, ultricies
          vitae neque. Donec condimentum mollis ex, a tincidunt risus tincidunt
          nec:
        </p>
        <p>
          <ul>
            <li>Donec lacinia eros nisi</li>
            <li>Sit amet volutpat metus fermentum non</li>
            <li>Sed vel fermentum augue</li>
          </ul>
        </p>
      </>
    ),
  },
];
