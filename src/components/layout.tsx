import * as React from 'react';
import Helmet from 'react-helmet';

import { Footer, Menu } from '@components';
import { useSiteMetadata } from '@hooks';
import favicon from '@static/favicon.ico';
import styled, { ThemeProvider } from '@styled-components';
import { GlobalStyle, theme } from '@styles';

const Root = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
`;

const Layout: React.FunctionComponent = ({ children }) => {
  const siteMetadata = useSiteMetadata();

  return (
    <Root>
      <Helmet>
        <title>{siteMetadata.title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={favicon} />
      </Helmet>

      <ThemeProvider theme={theme}>
        <React.Fragment>
          <Content>
            <Menu />
            {children}
          </Content>

          <Footer />
        </React.Fragment>
      </ThemeProvider>

      <GlobalStyle />
    </Root>
  );
};

export default Layout;
