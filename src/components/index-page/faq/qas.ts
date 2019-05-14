export interface Qa {
  readonly question: string;
  readonly answer: string[];
}

export const qas: readonly Qa[] = [
  {
    question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
    answer: [
      'Quisque laoreet risus a ligula luctus maximus. Duis non egestas dolor.',
      'Duis facilisis urna purus, ac facilisis erat sollicitudin et. Morbi consectetur, metus ac ultricies mollis, ligula lectus ultrices mi, sed rutrum augue ligula at diam. Mauris sem dolor, tincidunt et accumsan non, pellentesque quis justo.',
    ],
  },
  {
    question: 'Sed libero odio, volutpat et faucibus euismod, maximus a diam?',
    answer: [
      'Aliquam est ex, finibus vitae sodales eget, ultricies vitae neque. Donec condimentum mollis ex, a tincidunt risus tincidunt nec.',
      'Donec lacinia eros nisi, sit amet volutpat metus fermentum non. Sed vel fermentum augue.',
    ],
  },
];
