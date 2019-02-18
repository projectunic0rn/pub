import { Link } from 'gatsby';
import * as React from 'react';

import { site } from '@config/site';
import styled from '@styled-components';

interface MenuProps {
  siteTitle?: string;
}

const Wrapper = styled.header`
  background: ${({ theme }) => theme.colors.highlight};
  width: 100%;
  padding: 1.5rem 0;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-weight: 600;
  transition: all 0.2s;

  &:hover {
    color: white;
  }
`;

const Brand = styled(StyledLink)`
  font-weight: 700;
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

const Menu: React.FunctionComponent<MenuProps> = ({ siteTitle }) => (
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

Menu.defaultProps = {
  siteTitle: site.title,
};

export default Menu;
