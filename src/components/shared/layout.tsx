import * as React from 'react';

import Navigation from './navigation';
import Footer from './footer';
import { Seo } from '@components/shared';
import styled, { ThemeProvider } from '@styled-components';
import { GlobalStyle, theme } from '@styles';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Content = styled.div`
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
`;

const Layout: React.FC = ({ children }) => (
  <Root>
    <Seo title="Home" />

    <ThemeProvider theme={theme}>
      <React.Fragment>
        <Content>
          <Navigation />
          {children}
        </Content>

        <Footer />
      </React.Fragment>
    </ThemeProvider>

    <GlobalStyle />
  </Root>
);

export default Layout;
