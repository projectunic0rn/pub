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

interface NavVisibilityState {
  isNavAtTop: boolean;
  isNavVisible: boolean;
}

interface NavItemsState {
  navItems: NavItem[];
}

interface SidebarState {
  isSidebarOpen: boolean;
}

type LayoutState = NavVisibilityState & SidebarState & NavItemsState;

const NAV_TOGGLE = '[layout] NAV_TOGGLE' as const;
const SIDEBAR_TOGGLE = '[layout] SIDEBAR_TOGGLE' as const;
const NAV_ITEMS_CHANGE = '[layout] NAV_ITEMS_CHANGE' as const;

type ActionType =
  | typeof SIDEBAR_TOGGLE
  | typeof NAV_TOGGLE
  | typeof NAV_ITEMS_CHANGE;

interface LayoutAction<T = ActionType> {
  type: T;
  payload: NavVisibilityState | SidebarState | NavItemsState;
}

const initialState: LayoutState = {
  isNavAtTop: true,
  isNavVisible: true,
  navItems: [],
  isSidebarOpen: false,
};

const reducer: Reducer<LayoutState, LayoutAction> = (state, action) => {
  switch (action.type) {
    case NAV_TOGGLE:
    case SIDEBAR_TOGGLE:
    case NAV_ITEMS_CHANGE:
      return { ...state, ...action.payload };
    default:
      throw new Error('unknown action type');
  }
};

const Layout: FC<LayoutProps> = ({ children }) => {
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

  const updateNavItems = () => {
    const isUserAuthenticated = UserAuthHelper.isUserAuthenticated();
    const newNavItems = defaultNavItems.filter(({ show }) => {
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
    dispatch({ type: NAV_ITEMS_CHANGE, payload: { navItems: newNavItems } });
  };

  useLayoutEffect(() => {
    updateNavItems();
  }, []);

  return (
    <Fragment>
      <Seo title="Home" />

      <ThemeProvider theme={theme}>
        <Fragment>
          <div id="main">
            <Navigation
              isAtTop={state.isNavAtTop}
              isVisible={state.isNavVisible}
              navItems={state.navItems}
              isSidebarOpen={state.isSidebarOpen}
              openSidebar={setOpen(true)}
              updateNavItems={updateNavItems}
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
            <Sidebar navItems={state.navItems} />
          </OffCanvas>
        </Fragment>
      </ThemeProvider>
    </Fragment>
  );
};

export default Layout;
