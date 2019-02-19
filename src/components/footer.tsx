import * as React from 'react';

import styled from '@styled-components';

const Wrapper = styled.footer`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: flex-start;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.sizes.maxWidth};
`;

const List = styled.ul`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.colors.secondary};
  padding: 1em 0 0.5em;
  margin: 0 1.5em;
`;

const Item = styled.li`
  display: inline-block;
  padding: 0.25em 0;
  width: 100%;

  @media screen and (min-width: ${({ theme }) => theme.responsive.small}) {
    width: auto;
  }

  a {
    font-weight: 600;
    transition: all 0.2s;
    color: ${({ theme }) => theme.colors.base};

    &:visited {
      color: ${({ theme }) => theme.colors.base};
    }

    &:hover {
      color: ${({ theme }) => theme.colors.highlight};
    }
  }
`;

const Footer: React.FunctionComponent = () => (
  <Wrapper>
    <List>
      <Item>
        <a
          href="https://projectunicorn.net/"
          rel="nofollow noopener noreferrer"
          target="_blank"
        >
          Project Unicorn
        </a>
      </Item>

      <Item>
        <a
          href="https://github.com/rmjordas/pub"
          target="_blank"
          rel="noopener noreferrer"
        >
          pub
        </a>{' '}
        by{' '}
        <a
          href="https://github.com/rmjordas"
          target="_blank"
          rel="noopener noreferrer"
        >
          @rmjordas
        </a>
      </Item>
    </List>
  </Wrapper>
);

export default Footer;
