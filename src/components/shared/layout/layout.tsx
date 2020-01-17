import { navigate } from 'gatsby';
import React, { FC, Fragment, Reducer, useEffect, useReducer } from 'react';
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

interface NavState {
  isSidebarOpen: boolean;
}

interface AuthState {
  isUserAuthenticated: boolean;
}

type LayoutState = NavState & AuthState;

const AUTH_IS = 'AUTH_IS' as const;
const SIDEBAR_TOGGLE = 'SIDEBAR_TOGGLE' as const;

interface LayoutAction<T = typeof AUTH_IS | typeof SIDEBAR_TOGGLE> {
  type: T;
  payload: NavState | AuthState;
}

const initialState: LayoutState = {
  isSidebarOpen: false,
  isUserAuthenticated: false,
};

const reducer: Reducer<LayoutState, LayoutAction> = (state, action) => {
  switch (action.type) {
    case AUTH_IS:
    case SIDEBAR_TOGGLE:
      return { ...state, ...action.payload };
    default:
      throw new Error('unknown action type');
  }
};

const Layout: FC<LayoutProps> = ({ children, navItems = defaultNavItems }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setOpen = (isSidebarOpen: boolean) => () =>
    dispatch({ type: SIDEBAR_TOGGLE, payload: { isSidebarOpen } });

  const signOut = () => {
    SessionStorageHelper.deleteJwt();
    navigate('/');
  };

  useEffect(() => {
    const isUserAuthenticated = UserAuthHelper.isUserAuthenticated();

    dispatch({ type: AUTH_IS, payload: { isUserAuthenticated } });
  }, []);

  if (state.isUserAuthenticated) {
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
        return state.isUserAuthenticated;
      case Show.GuestOnly:
        return !state.isUserAuthenticated;
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
              isSidebarOpen={state.isSidebarOpen}
              openSidebar={setOpen(true)}
            />

            {children}

            <Footer />
          </div>

          <OffCanvas
            isOpen={state.isSidebarOpen}
            height="100%"
            position="right"
            mainContainerSelector="#main"
            onClose={setOpen(false)}
            labelledby="menu-button"
          >
            <Sidebar navItems={navItems} />
          </OffCanvas>
        </Fragment>
      </ThemeProvider>
    </Fragment>
  );
};

export default Layout;
