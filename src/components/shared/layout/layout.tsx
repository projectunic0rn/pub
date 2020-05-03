import React, {
  FC,
  Fragment,
  Reducer,
  useLayoutEffect,
  useReducer,
} from 'react';
import OffCanvas from 'react-aria-offcanvas';
import { ThemeProvider } from 'styled-components';

import { defaultNavItems } from './default-nav-items';
import ErrorComponent from './error-component';
import {
  ErrorBoundary,
  Seo,
  Navigation,
  NavItem,
  Show,
  Footer,
  Sidebar,
} from '@components/shared';
import { UserAuthHelper } from '@helpers';
import { useScrollPosition } from '@hooks';
import { theme } from '@styles';

interface OwnProps {
  navItems?: NavItem[];
}

type LayoutProps = OwnProps;

interface NavState {
  isNavAtTop: boolean;
  isNavVisible: boolean;
}

interface SidebarState {
  isSidebarOpen: boolean;
}

interface AuthState {
  isUserAuthenticated: boolean;
}

type LayoutState = NavState & SidebarState & AuthState;

const AUTH_IS = '[layout] AUTH_IS' as const;
const NAV_TOGGLE = '[layout] NAV_TOGGLE' as const;
const SIDEBAR_TOGGLE = '[layout] SIDEBAR_TOGGLE' as const;

type ActionType = typeof AUTH_IS | typeof SIDEBAR_TOGGLE | typeof NAV_TOGGLE;

interface LayoutAction<T = ActionType> {
  type: T;
  payload: NavState | SidebarState | AuthState;
}

const initialState: LayoutState = {
  isNavAtTop: true,
  isNavVisible: true,
  isSidebarOpen: false,
  isUserAuthenticated: false,
};

const reducer: Reducer<LayoutState, LayoutAction> = (state, action) => {
  switch (action.type) {
    case NAV_TOGGLE:
    case AUTH_IS:
    case SIDEBAR_TOGGLE:
      return { ...state, ...action.payload };
    default:
      throw new Error('unknown action type');
  }
};

const Layout: FC<LayoutProps> = ({ children, navItems = defaultNavItems }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isAtTop = currPos.y === 0;
      const isVisible = currPos.y > prevPos.y;

      if (state.isNavAtTop === isAtTop && state.isNavVisible === isVisible) {
        return;
      }

      const isNavAtTop =
        state.isNavAtTop !== isAtTop ? isAtTop : state.isNavAtTop;
      const isNavVisible =
        isNavAtTop || state.isNavVisible !== isVisible
          ? isVisible
          : state.isNavVisible;

      dispatch({ type: NAV_TOGGLE, payload: { isNavAtTop, isNavVisible } });
    },
    [state.isNavAtTop, state.isNavVisible],
    null,
    false,
    300,
  );

  const setOpen = (isSidebarOpen: boolean) => () =>
    dispatch({ type: SIDEBAR_TOGGLE, payload: { isSidebarOpen } });

  useLayoutEffect(() => {
    const isUserAuthenticated = UserAuthHelper.isUserAuthenticated();

    dispatch({ type: AUTH_IS, payload: { isUserAuthenticated } });
  }, []);

  // TODO: Possibly mutation to be added to useEffects
  /*
    https://reactjs.org/docs/hooks-reference.html#useeffect
    Mutations, subscriptions, timers, logging, and other side effects are
    not allowed inside the main body of a function component (referred to
    as React’s render phase). Doing so will lead to confusing bugs and
    inconsistencies in the UI.
  */
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
      <Seo title="Home" />

      <ThemeProvider theme={theme}>
        <Fragment>
          <div id="main">
            <Navigation
              isAtTop={state.isNavAtTop}
              isVisible={state.isNavVisible}
              navItems={navItems}
              isSidebarOpen={state.isSidebarOpen}
              openSidebar={setOpen(true)}
            />

            <ErrorBoundary
              // eslint-disable-next-line no-console
              onError={console.error}
              component={<ErrorComponent />}
            >
              {children}
            </ErrorBoundary>

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
