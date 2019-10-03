import { Link } from 'gatsby';
import * as React from 'react';

import { Anchor } from '@components/shared';
import { puLogo } from '@images';
import { useSiteMetadata } from '@hooks';
import styled from '@styled-components';
import NavButton from './buttons/nav-button';
import dotIcon from '../../images/dot.png';
import { UserAuthHelper } from '@/helpers';

export interface NavigationLink {
  content: string;
  href: string;
  title?: string;
  requiresAuthentication: boolean;
  button?: boolean;
  link?: boolean;
  profileIcon?: boolean;
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

const NavLogo = styled.img.attrs({ src: puLogo, alt: 'Project Unicorn' })`
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

const ProfileIconContainer = styled.div`
  cursor: pointer;
  position: relative;
`;

const ProfileIcon = styled.img`
  border-radius: 100%;
  margin-bottom: -0.9em !important;
`;

const ProfileDot = styled.img`
  position: absolute;
  top: 1.5em;
  right: -0.2em;
`;

const filterInvalidNavItems = (navItem: NavigationLink) => {
  // const userAuthenticated = UserAuthHelper.isUserAuthenticated();
  return navItem.requiresAuthentication === false;
};

const Navigation: React.FC<NavigationProps> = ({ navLinks = [] }) => {
  // TODO: Replace w/ variable to read user authentication status
  const siteMetadata = useSiteMetadata();
  const validNavItems = navLinks.filter(filterInvalidNavItems);
  return (
    <Nav>
      <Link to="/" title={`${siteMetadata.title}`}>
        <NavLogo />
      </Link>

      <NavMenu>
        {validNavItems.map((v: NavigationLink) => (
          <NavMenuItem key={v.href}>
            {v.button && (
              <Link to={v.href} title={v.title}>
                <NavButton>{v.content}</NavButton>
              </Link>
            )}
            {v.link && (
              <Link to={v.href} title={v.title}>
                {v.content}
              </Link>
            )}
            {v.profileIcon && (
              <ProfileIconContainer>
                <ProfileIcon
                  src={v.content}
                  height={46}
                  width={46}
                  alt="profile image"
                />
                <ProfileDot
                  src={dotIcon}
                  height={16}
                  width={16}
                  alt="blue dot"
                />
              </ProfileIconContainer>
            )}
          </NavMenuItem>
        ))}
      </NavMenu>
    </Nav>
  );
};

export default Navigation;
