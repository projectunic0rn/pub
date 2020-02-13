import React, { FC } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@styles/theme';

export const MockThemeProvider: FC = ({ children }) => {
  return <ThemeProvider theme={theme}> {children} </ThemeProvider>;
};
