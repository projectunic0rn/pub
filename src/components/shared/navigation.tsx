import React, { useState, useEffect } from 'react';
import { UserAuthHelper } from '@/helpers';
import SessionStorageHelper from '@/helpers/session-storage-helper';
import { navigate } from 'gatsby';
import styled from '@styled-components';
import { puLogo } from '@images';
import { Link } from 'gatsby';
import NavButton from './buttons/nav-button';
import dotIcon from '../../images/dot.png';
import { useSiteMetadata } from '@hooks';
import { slide as Menu } from 'react-burger-menu';
import HamburgerMenuStyles from '@/styles/hamburger-menu';

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

/**
 * Desktop Navigation Components
 */

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

/**
 * Mobile Navigation Components
 */

const NavMobile = styled.div`
  padding: 3rem;
  outline: none;
`;

const NavLogoMobile = styled.img.attrs({ src: puLogo, alt: 'Project Unicorn' })`
  height: 70px;
  display: block;
  margin: 0 auto;
`;

const NavMenuMobile = styled.ul`
  margin: 4rem 0 0 0;
  list-style: none;
`;

const NavMenuItemMobile = styled.li`
  a {
    text-decoration: none;
  }
  font-size: 24px;
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
  const userAuthenticated = UserAuthHelper.isUserAuthenticated();
  return navItem.requiresAuthentication === userAuthenticated;
};

const handleSignOut = () => {
  SessionStorageHelper.deleteJwt();
  navigate('/');
};

const Navigation: React.FC<NavigationProps> = ({ navLinks = [] }) => {
  const siteMetadata = useSiteMetadata();
  const [validNavItems, setValidNavItems] = useState<NavigationLink[]>([]);

  const getWindowDimensions = (): number => {
    return typeof window !== `undefined` ? window.innerWidth : 0;
  };

  const [windowDimensions, setWindowDimensions] = useState<number>(
    getWindowDimensions(),
  );

  useEffect(() => {
    setValidNavItems(navLinks.filter(filterInvalidNavItems));

    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav>
      {windowDimensions <= 750 ? (
        <Menu styles={HamburgerMenuStyles} width={'100%'} right>
          <NavMobile>
            <Link to="/" title={`${siteMetadata.title}`}>
              <NavLogoMobile />
            </Link>

            <NavMenuMobile>
              {validNavItems.map((v: NavigationLink) => (
                <NavMenuItemMobile key={v.href}>
                  {v.button && (
                    <Link to={v.href} title={v.title}>
                      {v.content}
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
                </NavMenuItemMobile>
              ))}
              {UserAuthHelper.isUserAuthenticated() && (
                <NavMenuItemMobile>
                  <NavButton onClick={handleSignOut}>Sign Out</NavButton>
                </NavMenuItemMobile>
              )}
            </NavMenuMobile>
          </NavMobile>
        </Menu>
      ) : (
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
            {UserAuthHelper.isUserAuthenticated() && (
              <NavMenuItem>
                <NavButton onClick={handleSignOut}>Sign Out</NavButton>
              </NavMenuItem>
            )}
          </NavMenu>
        </Nav>
      )}
    </nav>
  );
};

export default Navigation;
