import * as React from 'react';
import Helmet from 'react-helmet';

import Footer from '@components/footer';
import Menu from '@components/menu';
import { site } from '@config/site';
import { ThemeProvider } from '@styled-components';
import { GlobalStyle, theme } from '@styles';
// @ts-ignore
import favicon from '../../static/favicon.ico';

const Layout: React.FunctionComponent = ({ children }) => (
  <div className="siteRoot">
    <Helmet>
      <title>{site.title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href={favicon} />
    </Helmet>

    <ThemeProvider theme={theme}>
      <React.Fragment>
        <div className="siteContent">
          <Menu />
          {children}
        </div>

        <Footer />
      </React.Fragment>
    </ThemeProvider>

    <GlobalStyle />
  </div>
);

export default Layout;
