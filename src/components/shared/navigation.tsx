import { Link } from 'gatsby';
import * as React from 'react';

import { Anchor } from '@components/shared';
import { puLogo } from '@images';
import { useSiteMetadata } from '@hooks';
import styled from 'styled-components';

export interface NavigationLink {
  content: string;
  external: boolean;
  href: string;
  title?: string;
}

interface OwnProps {
  navLinks: NavigationLink[];
}

type NavigationProps = OwnProps;

const Nav = styled.nav`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 3.125em;

  @media screen and (max-width: ${({ theme }) => theme.sizes.width.small}) {
    padding: 1.5625em;
  }

  && a {
    background: none;
    color: ${({ theme }) => theme.colors.text};
    transition: 0.2s;

    @media (hover: hover) {
      &:hover {
        color: ${({ theme }) => theme.colors.highlight};
      }
    }
  }
`;

const NavLogo = styled.img.attrs(() => ({
  src: puLogo,
  alt: 'Project Unicorn',
}))`
  margin: 0;
  width: 8em;

  @media screen and (max-width: ${({ theme }) => theme.sizes.width.small}) {
    height: 2.1875em;
  }
`;

const NavMenu = styled.ul`
  list-style: none;
  margin: 0;
`;

const NavMenuItem = styled.li`
  display: inline-block;
  font-weight: 800;
  margin: 0;
  padding-right: 2.8125em;

  &:last-child {
    padding: 0;
  }
`;

const Navigation: React.FC<NavigationProps> = ({ navLinks = [] }) => {
  const siteMetadata = useSiteMetadata();

  return (
    <Nav>
      <Link to="/" title={`${siteMetadata.title}`}>
        <NavLogo />
      </Link>

      <NavMenu>
        {navLinks.map((v) => (
          <NavMenuItem key={v.href}>
            {v.external ? (
              <Anchor href={v.href} content={v.content} title={v.title} />
            ) : (
              <Link to={v.href} title={v.title}>
                {v.content}
              </Link>
            )}
          </NavMenuItem>
        ))}
      </NavMenu>
    </Nav>
  );
};

export default Navigation;
