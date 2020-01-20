import { Link } from 'gatsby';
import React from 'react';

import { NavItem, Show } from '@components/shared/navigation';
import { defaultNavItems } from '@components/shared';

export const navItems: NavItem[] = [
  {
    item: <Link to="/blog/tags">Tags</Link>,
    key: '/blog/tags',
    show: Show.Always,
  },
  ...defaultNavItems,
];
