import * as React from 'react';
import Helmet from 'react-helmet';

import { Footer, Menu } from '@components';
import { useSiteMetadata } from '@hooks';
import favicon from '@static/favicon.ico';
import { ThemeProvider } from '@styled-components';
import { GlobalStyle, theme } from '@styles';

const Layout: React.FunctionComponent = ({ children }) => {
  const siteMetadata = useSiteMetadata();

  return (
    <div className="siteRoot">
      <Helmet>
        <title>{siteMetadata.title}</title>
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
};

export default Layout;
