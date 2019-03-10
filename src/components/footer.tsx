import * as React from 'react';

import puLogo from '@images/pu.svg';
import styled, { css } from '@styled-components';

interface StyledAnchorProps {
  noUnderline?: boolean;
}

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

const StyledAnchor = styled.a<StyledAnchorProps>`
  font-weight: 600;
  transition: all 0.2s;
  color: ${({ theme }) => theme.colors.base};

  ${({ noUnderline }) =>
    noUnderline &&
    css`
      background-image: none;
    `}

  && {
    &:visited {
      color: ${({ theme }) => theme.colors.base};
    }

    &:hover {
      color: ${({ theme }) => theme.colors.highlight};
    }
  }
`;

const Item = styled.li`
  display: inline-block;
  padding: 0.25em 0;
  width: 100%;

  @media screen and (min-width: ${({ theme }) => theme.responsive.small}) {
    width: auto;
  }
`;

const Footer: React.FunctionComponent = () => (
  <Wrapper>
    <List>
      <Item>
        <StyledAnchor
          href="https://projectunicorn.net/"
          rel="nofollow noopener noreferrer"
          target="_blank"
          noUnderline
        >
          <img src={puLogo} style={{ width: '100px' }} alt="Project Unicorn" />
        </StyledAnchor>
      </Item>

      <Item>
        <StyledAnchor
          href="https://github.com/projectunic0rn/pub"
          target="_blank"
          rel="noopener noreferrer"
        >
          pub
        </StyledAnchor>{' '}
        repo is maintained by{' '}
        <StyledAnchor
          href="https://github.com/rmjordas"
          target="_blank"
          rel="noopener noreferrer"
        >
          @rmjordas
        </StyledAnchor>
      </Item>
    </List>
  </Wrapper>
);

export default Footer;
