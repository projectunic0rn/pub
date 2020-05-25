import React, { FC, useState } from 'react';
import { MainContent } from '@components/shared/containers/main-content';
import { SettingsContainer } from '@components/shared/containers';
import { ContainerSidePanel } from '@components/shared/side-panels';
import { menuItems, getMenuItemContent } from './content/menu-items';
import { MenuItem } from '@components/shared/side-panels/container-side-panel';

export type StatusType = 'success' | 'error';

export const AccountSettings: FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [currentMenuItem, setCurrentMenuItem] = useState(menuItems[0].name);

  const handleMenuItemClick = (name: string) => {
    setCurrentMenuItem(name);
  };

  const handleStatusDisplay = (status: StatusType, message: string) => {
    switch (status) {
      case 'success':
        setSuccess(message);
        break;
      case 'error':
        setError(message);
      default:
        break;
    }
  };

  return (
    <SettingsContainer
      error={error}
      setError={setError}
      success={success}
      setSuccess={setSuccess}
      isLoading={false}
    >
      <ContainerSidePanel>
        {menuItems.map((m) => {
          return (
            <MenuItem
              onClick={() => handleMenuItemClick(m.name)}
              key={m.name}
              active={m.name === currentMenuItem}
            >
              {m.name}
            </MenuItem>
          );
        })}
      </ContainerSidePanel>
      <MainContent>
        {getMenuItemContent(currentMenuItem, { handleStatusDisplay })}
      </MainContent>
    </SettingsContainer>
  );
};
