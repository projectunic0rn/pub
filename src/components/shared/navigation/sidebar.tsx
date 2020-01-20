import React, { FC } from 'react';
import styled from 'styled-components';

import Brand from './brand';
import { NavItem } from './nav-item';

interface OwnProps {
  navItems: NavItem[];
  close?: () => void;
}

type SidebarProps = OwnProps;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;

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

const List = styled.ul`
  display: initial;
  list-style: none;
  margin: 0;
`;

const ListItem = styled.li`
  font-weight: 800;
`;

const Sidebar: FC<SidebarProps> = ({ navItems = [] }) => (
  <Wrapper>
    <List>
      <ListItem>
        <Brand />
      </ListItem>

      {navItems.map(({ item, key }) => (
        <ListItem key={'sidebar' + key}>{item}</ListItem>
      ))}
    </List>
  </Wrapper>
);

export default Sidebar;
