import React, { FC } from 'react';
import styled from 'styled-components';

type Size = 'tiny' | 'small' | 'default';

interface PageTitleProps {
  /** Determines the styles to be applied to the title text. */
  size?: Size;
}

interface Style {
  fontSize: string;
  margin: string;
}

interface TitleProps {
  size: Size;
}

const styles: { [key in Size]: Style } = {
  tiny: { fontSize: '1.2em', margin: '0.5rem 0 2rem' },
  small: { fontSize: '2em', margin: '1rem 0 4rem 0' },
  default: { fontSize: '3em', margin: '0 0 3rem 0' },
};

const Title = styled.h1<TitleProps>`
  font-size: ${({ size }) => styles[size].fontSize};
  text-transform: capitalize;
  font-weight: 600;
  text-align: center;
  margin: 0 0 3rem 0;
  margin: ${({ size }) => styles[size].margin};
  line-height: 1.2;

  span {
    margin: 0 0 0 0.25em;
  }

  a {
    transition: all 0.2s;
    color: ${({ theme }) => theme.colors.base};

    @media (hover: hover) {
      &:hover {
        color: ${({ theme }) => theme.colors.highlight};
      }
    }
  }
`;

/** Wrapper for a page title. */
const PageTitle: FC<PageTitleProps> = ({ children, size = 'default' }) => (
  <Title size={size}>{children}</Title>
);

export default PageTitle;
