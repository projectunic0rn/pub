import { Link } from 'gatsby';
import * as React from 'react';

import { Anchor } from '@components';
import { puLogo } from '@images';
import { useSiteMetadata } from '@hooks';
import styled from '@styled-components';

const Nav = styled.nav`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 3.125em;

  @media screen and (max-width: 41.6875em) {
    padding: 1.5625em;
  }
`;

const NavLogo = styled.img.attrs({ src: puLogo, alt: 'Project Unicorn' })`
  margin: 0;
  width: 8em;

  @media screen and (max-width: 41.6875em) {
    height: 2.1875em;
  }
`;

const NavMenu = styled.ul`
  list-style: none;
  margin: 0;
`;

const NavMenuItem = styled.li`
  display: inline-block;
  font-weight: 700;
  margin: 0;
  padding-right: 2.8125em;

  &:last-child {
    padding: 0;
  }

  && a {
    background: none;
    color: rgba(0, 0, 0, 0.73);
    transition: 0.2;

    &:hover {
      color: ${({ theme }) => theme.colors.highlight};
    }
  }
`;

const Navigation: React.FC = () => {
  const siteMetadata = useSiteMetadata();

  return (
    <Nav>
      <NavLogo />

      <NavMenu>
        <NavMenuItem>
          <Link to="/blog" title={`${siteMetadata.title} blog`}>
            Blog
          </Link>
        </NavMenuItem>

        <NavMenuItem>
          <Anchor
            href={`//github.com/${siteMetadata.social.github}`}
            content="GitHub"
            title={`${siteMetadata.title} GitHub organization`}
          />
        </NavMenuItem>
      </NavMenu>
    </Nav>
  );
};

export default Navigation;
