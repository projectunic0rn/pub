import React from 'react';
import { AuthProvider, WorkspaceTypesProvider } from '@contexts';
import './src/styles/global.css';
import 'prismjs/themes/prism.css';

export const shouldUpdateScroll = ({ prevRouterProps, routerProps }) => {
  if (prevRouterProps === undefined) {
    return false;
  }

  if (prevRouterProps.location.pathname === routerProps.location.pathname) {
    return false;
  }

  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

  return false;
};

export const wrapRootElement = ({ element }) => (
  <AuthProvider>
    <WorkspaceTypesProvider>{element}</WorkspaceTypesProvider>
  </AuthProvider>
);
