import React, { FC } from 'react';
import styled from 'styled-components';

import Brand from './brand';
import { NavItem } from './nav-item';

interface OwnProps {
  isSidebarOpen: boolean;
  navItems?: NavItem[];
  openSidebar: () => void;
}

type NavigationProps = OwnProps;

const Wrapper = styled.div`
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
  isSidebarOpen,
  navItems = [],
  openSidebar,
}) => {
  return (
    <Wrapper>
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
