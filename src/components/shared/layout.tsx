import * as React from 'react';

import Navigation, { NavigationLink } from './navigation';
import Footer from './footer';
import { Seo } from '@components/shared';
import { useSiteMetadata } from '@hooks';
import { ThemeProvider } from '@styled-components';
import { GlobalStyle, theme } from '@styles';

interface OwnProps {
  navLinks?: NavigationLink[];
}

type LayoutProps = OwnProps;

const Layout: React.FC<LayoutProps> = ({ children, navLinks = [] }) => {
  const siteMetadata = useSiteMetadata();

  if (navLinks.length === 0) {
    navLinks = [
      {
        content: 'Blog',
        external: false,
        href: '/blog',
        title: `${siteMetadata.title} blog`,
      },
      {
        content: 'GitHub',
        external: true,
        href: `//github.com/${siteMetadata.social.github}`,
        title: `${siteMetadata.title} GitHub organization`,
      },
      {
        content: 'Sign In',
        external: false,
        href: '/signin',
        title: `${siteMetadata.title} sign in`,
      },
    ];
  }

  return (
    <React.Fragment>
      <Seo title="Home" />

      <ThemeProvider theme={theme}>
        <React.Fragment>
          <Navigation navLinks={navLinks} />
          {children}
          <Footer />
        </React.Fragment>
      </ThemeProvider>

      <GlobalStyle />
    </React.Fragment>
  );
};

export default Layout;
