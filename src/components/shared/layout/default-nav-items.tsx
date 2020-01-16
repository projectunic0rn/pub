import { Link, navigate } from 'gatsby';
import React from 'react';

import { NavButton, NavItem, Show } from '../navigation';

const handleNavigate = (to: string) => () => navigate(to);

export const defaultNavItems: NavItem[] = [
  {
    item: <Link to="/blog">Blog</Link>,
    key: '/blog',
    show: Show.Always,
  },
  {
    item: <Link to="/app/projects">Projects</Link>,
    key: '/app/projects',
    show: Show.Always,
  },
  {
    item: <NavButton onClick={handleNavigate('/signin')}>Sign In</NavButton>,
    key: '/signin',
    show: Show.GuestOnly,
  },
  {
    item: (
      <NavButton onClick={handleNavigate('/app/projects/create')}>
        Start Project
      </NavButton>
    ),
    key: '/app/projects/create',
    show: Show.AuthOnly,
  },
];
