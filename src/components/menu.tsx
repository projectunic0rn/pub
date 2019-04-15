import { Link } from 'gatsby';
import * as React from 'react';

import puLogo from '@images/pu.svg';
import { useSiteMetadata } from '@hooks';
import styled from '@styled-components';

const Wrapper = styled.header`
  background: white;
  width: 100%;
  padding: 1em 0;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.highlight};
  transition: all 0.2s;
  height: 100%;
  display: flex;
  align-items: center;
  background-image: none;

  &:hover {
    color: ${({ theme }) => theme.colors.highlight};
  }
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
  align-items: center;
`;

const ListItem = styled.li`
  display: inline-block;
  margin: 0 0 0 1em;

  &:first-child {
    position: relative;
    margin: 0;
  }
`;

const activeLinkStyle = {};

/** Displays links to different parts of the application. */
const Menu: React.FC = () => {
  const siteMetadata = useSiteMetadata();

  return (
    <Wrapper>
      <Nav>
        <List>
          <ListItem>
            <StyledLink
              to="/"
              activeStyle={activeLinkStyle}
              title={`${siteMetadata.title} logo`}
            >
              <img
                src={puLogo}
                style={{ width: '100px' }}
                alt={`${siteMetadata.title}`}
                title={`${siteMetadata.title}`}
              />
            </StyledLink>
          </ListItem>

          <ListItem>
            <StyledLink
              to="/blog/tags/"
              activeStyle={activeLinkStyle}
              title={`${siteMetadata.title} tags page`}
            >
              Tags
            </StyledLink>
          </ListItem>
        </List>
      </Nav>
    </Wrapper>
  );
};

export default Menu;
