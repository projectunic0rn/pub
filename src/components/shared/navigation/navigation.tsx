import { navigate } from 'gatsby';
import React, { FC, useContext } from 'react';
import styled from 'styled-components';

import Brand from './brand';
import { NavItem } from './nav-item';
import { Profile } from '.';
import { AuthContext } from '@contexts';

interface OwnProps {
  isAtTop: boolean;
  isVisible: boolean;
  isSidebarOpen: boolean;
  navItems?: NavItem[];
  openSidebar: () => void;
}

type NavigationProps = OwnProps;
type WrapperProps = Pick<NavigationProps, 'isAtTop' | 'isVisible'>;

const Wrapper = styled.div<WrapperProps>`
  align-items: center;
  background: ${({ theme }) => theme.colors.baseinvert};
  display: flex;
  justify-content: space-between;
  left: 0;
  padding: 1.6em 3.125em;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1000;

  box-shadow: ${({ isAtTop, theme }) =>
    isAtTop ? 0 : `0 0.1rem 2rem ${theme.colors.shadow}`};
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  transition: all 0.2s
    ${({ isVisible }) => (isVisible ? 'ease-out' : 'ease-in')};
  transform: ${({ isVisible }) => (isVisible ? 'none' : 'translate(0, -100%)')};

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

const Menu = styled.ul`
  display: initial;
  list-style: none;
  margin: 0;

  @media screen and (max-width: ${({ theme }) => theme.sizes.width.medium}) {
    display: none;
  }
`;

const MenuItem = styled.li`
  display: inline-block;
  font-weight: 800;
  margin: 0;
  padding-right: 2.8125em;

  &:last-child {
    padding: 0;
  }
`;

const MenuButton = styled.button`
  border: none;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  display: none;
  font-weight: 800;
  transition: 0.2s;

  @media (hover: hover) {
    &:hover {
      color: ${({ theme }) => theme.colors.highlight};
    }
  }

  @media screen and (max-width: ${({ theme }) => theme.sizes.width.medium}) {
    display: initial;
  }
`;

const Navigation: FC<NavigationProps> = ({
  isAtTop,
  isVisible,
  isSidebarOpen,
  navItems = [],
  openSidebar,
}) => {
  const authContext = useContext(AuthContext);

  const signOut = () => {
    if (authContext.signOut == undefined) {
      return;
    }
    authContext.signOut();
    navigate('/');
  };

  const setAvatar = (avatar: string) => {
    navItems.map((navItem) => {
      if (navItem.key == 'user-avatar-dropdown') {
        navItem.item = <Profile content={avatar} signOut={signOut} />;
      }
    });
  };

  setAvatar(authContext.avatar);

  return (
    <Wrapper isAtTop={isAtTop} isVisible={isAtTop || isVisible}>
      <Brand />
      <Menu>
        {navItems.map(({ item, key }) => (
          <MenuItem key={'menubar' + key}>{item}</MenuItem>
        ))}
      </Menu>

      <MenuButton
        id="menu-button"
        aria-label="Menu"
        aria-controls="menu"
        aria-expanded={isSidebarOpen}
        onClick={openSidebar}
      >
        Menu
      </MenuButton>
    </Wrapper>
  );
};

export default Navigation;
