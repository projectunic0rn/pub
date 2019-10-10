import { Link } from 'gatsby';
import React, { useState, useEffect } from 'react';

import { puLogo } from '@images';
import { useSiteMetadata } from '@hooks';
import styled from '@styled-components';
import NavSignOutButton from './buttons/nav-signout-button';
import dotIcon from '../../images/dot.png';
import { UserAuthHelper } from '@/helpers';
import SessionStorageHelper from '@/helpers/session-storage-helper';
import { navigate } from 'gatsby';
import { slide as Menu } from 'react-burger-menu';
import HamburgerMenuStyles from '@/styles/hamburger-menu';
import { NavigationLink } from './navigation';

interface OwnProps {
  navLinks: NavigationLink[];
}

type NavigationProps = OwnProps;

const Nav = styled.div`
  padding: 3rem;
  outline: none;
`;

const NavLogo = styled.img.attrs({ src: puLogo, alt: 'Project Unicorn' })`
  height: 70px;
  display: block;
  margin: 0 auto;
`;

const NavMenu = styled.ul`
  margin: 4rem 0 0 0;
  list-style: none;
`;

const NavMenuItem = styled.li`
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

const NavigationMobile: React.FC<NavigationProps> = ({ navLinks = [] }) => {
  const siteMetadata = useSiteMetadata();
  const SessionHelperApi = new SessionStorageHelper();
  const [validNavItems, setValidNavItems] = useState<NavigationLink[]>([]);

  useEffect(() => {
    setValidNavItems(navLinks.filter(filterInvalidNavItems));
  }, []);

  const handleSignOut = () => {
    SessionStorageHelper.deleteJwt();
    navigate('/');
  };

  return (
    <Menu styles={HamburgerMenuStyles} width={'100%'} right>
      <Nav>
        <Link to="/" title={`${siteMetadata.title}`}>
          <NavLogo />
        </Link>

        <NavMenu>
          {validNavItems.map((v: NavigationLink) => (
            <NavMenuItem key={v.href}>
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
            </NavMenuItem>
          ))}
          {UserAuthHelper.isUserAuthenticated() && (
            <NavMenuItem>
              <NavSignOutButton onClick={handleSignOut}>
                Sign Out
              </NavSignOutButton>
            </NavMenuItem>
          )}
        </NavMenu>
      </Nav>
    </Menu>
  );
};

export default NavigationMobile;
