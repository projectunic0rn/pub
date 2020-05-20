import React, { ReactElement } from 'react';
import { ProfileContent } from './profile-content';
import { ChangePasswordContent } from './change-password-content';
import { StatusType } from '../account-settings';

export interface ContentProps {
  handleStatusDisplay?: (status: StatusType, message: string) => void;
}

interface MenuItem {
  name: string;
  content: ReactElement;
}

export const menuItems: MenuItem[] = [
  {
    name: 'Change Password',
    content: <ChangePasswordContent />,
  },
  {
    name: 'Edit Profile',
    content: <ProfileContent />,
  },
];

export const getMenuItemContent = (name: string, props: ContentProps) => {
  switch (name) {
    case 'Change Password':
      return <ChangePasswordContent {...props} />;
    case 'Edit Profile':
      return <ProfileContent {...props} />;
  }
};
