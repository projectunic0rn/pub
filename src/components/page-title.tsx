import * as React from 'react';

import styled from '@styled-components';

interface PageTitleProps {
  small?: boolean;
}

type TitleProps = Pick<PageTitleProps, 'small'>;

const Title = styled.h1<TitleProps>`
  font-size: ${({ small }) => (small ? '2em' : '3em')};
  text-transform: capitalize;
  font-weight: 600;
  text-align: center;
  margin: 0 0 3rem 0;
  margin: ${({ small }) => (small ? '1rem 0 4rem 0' : '0 0 3rem 0')};
  line-height: 1.2;

  span {
    margin: 0 0 0 0.25em;
  }

  a {
    transition: all 0.2s;
    color: ${({ theme }) => theme.colors.base};

    &:hover {
      color: ${({ theme }) => theme.colors.highlight};
    }
  }
`;

const PageTitle: React.FC<PageTitleProps> = ({ children, small = false }) => (
  <Title small={small}>{children}</Title>
);

export default PageTitle;
