import { navigate } from 'gatsby';
import React, { FC, Fragment, useEffect, useState } from 'react';
import OffCanvas from 'react-aria-offcanvas';
import { ThemeProvider } from 'styled-components';

import { defaultNavItems } from './default-nav-items';
import {
  Seo,
  Navigation,
  NavButton,
  NavItem,
  Show,
  Footer,
  Sidebar,
} from '@components/shared';
import { UserAuthHelper, SessionStorageHelper } from '@helpers';
import { GlobalStyle, theme } from '@styles';

interface OwnProps {
  navItems?: NavItem[];
}

type LayoutProps = OwnProps;

const Layout: FC<LayoutProps> = ({ children, navItems = defaultNavItems }) => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const setOpen = (v: boolean) => () => setIsOpen(v);

  const signOut = () => {
    SessionStorageHelper.deleteJwt();
    navigate('/');
  };

  useEffect(() => {
    setIsUserAuthenticated(UserAuthHelper.isUserAuthenticated());
  }, []);

  if (isUserAuthenticated) {
    navItems.push({
      item: <NavButton onClick={signOut}>Sign Out</NavButton>,
      key: '/signout',
      show: Show.AuthOnly,
    });
  }

  navItems = navItems.filter(({ show }) => {
    switch (show) {
      case Show.Always:
        return true;
      case Show.AuthOnly:
        return isUserAuthenticated;
      case Show.GuestOnly:
        return !isUserAuthenticated;
      case Show.Never:
      default:
        return false;
    }
  });

  return (
    <Fragment>
      <GlobalStyle />
      <Seo title="Home" />

      <ThemeProvider theme={theme}>
        <Fragment>
          <div id="main">
            <Navigation
              navItems={navItems}
              isSidebarOpen={isOpen}
              openSidebar={setOpen(true)}
            />

            {children}

            <Footer />
          </div>

          <OffCanvas
            isOpen={isOpen}
            height="100%"
            position="right"
            mainContainerSelector="#main"
            onClose={setOpen(false)}
            labelledby="menu-button"
            lockBodyAfterOpen={false}
          >
            <Sidebar navItems={navItems} />
          </OffCanvas>
        </Fragment>
      </ThemeProvider>
    </Fragment>
  );
};

export default Layout;
