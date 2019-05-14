import * as React from 'react';

export interface Qa {
  readonly question: string | React.ReactNode;
  readonly answer: React.ReactNode;
}

export const qas: readonly Qa[] = [
  {
    question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
    answer: (
      <React.Fragment>
        <p>
          Quisque laoreet risus a ligula luctus maximus. Duis non egestas dolor.
        </p>
        <p>
          Duis facilisis urna purus, ac facilisis erat sollicitudin et. Morbi
          consectetur, <strong>metus ac ultricies mollis</strong>, ligula lectus
          ultrices mi, sed rutrum augue ligula at diam. Mauris sem dolor,
          tincidunt et accumsan non, <em>pellentesque quis justo</em>.
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
