import { Link } from 'gatsby';
import * as React from 'react';

import styled from '@styled-components';

interface HeaderProps {
  siteTitle?: string;
}

const Wrapper = styled.header`
  background: ${({ theme }) => theme.colors.highlight};
  width: 100%;
  padding: 1.5rem 0;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: lightgray;
  font-weight: 600;
  transition: all 0.2s;

  &:hover {
    color: white;
  }
`;

const Brand = styled(StyledLink)`
  font-family: 'Viga';
  font-weight: 400;
`;

const Nav = styled.nav`
  width: 100%;
  max-width: ${({ theme }) => theme.sizes.maxWidth};
  margin: 0 auto;
  padding: 0 1.5em;
`;

const List = styled.ul`
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li`
  display: inline-block;
  margin-left: 1em;

  &:first-child {
    position: relative;
    margin: 0;
    flex-basis: 100%;
  }
`;

const activeLinkStyle = {
  color: 'white',
};

const Header: React.FunctionComponent<HeaderProps> = ({ siteTitle = '' }) => (
  <Wrapper>
    <Nav>
      <List>
        <ListItem>
          <Brand to="/" activeStyle={activeLinkStyle}>
            {siteTitle}
          </Brand>
        </ListItem>

        <ListItem>
          <StyledLink to="/about/" activeStyle={activeLinkStyle}>
            About
          </StyledLink>
        </ListItem>

        <ListItem>
          <StyledLink to="/tags/" activeStyle={activeLinkStyle}>
            Tags
          </StyledLink>
        </ListItem>
      </List>
    </Nav>
  </Wrapper>
);

export default Header;
