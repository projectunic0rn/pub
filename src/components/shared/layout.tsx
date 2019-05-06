import * as React from 'react';

import Navigation, { NavigationLink } from './navigation';
import Footer from './footer';
import { Seo } from '@components/shared';
import { useSiteMetadata } from '@hooks';
import styled, { ThemeProvider } from '@styled-components';
import { GlobalStyle, theme } from '@styles';

interface OwnProps {
  navLinks?: NavigationLink[];
}

type LayoutProps = OwnProps;

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

const Layout: React.FC<LayoutProps> = ({ children, navLinks = [] }) => {
  const siteMetadata = useSiteMetadata();
  const defaultNavLinks: NavigationLink[] = [
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
  ];

  return (
    <Root>
      <Seo title="Home" />

      <ThemeProvider theme={theme}>
        <React.Fragment>
          <Content>
            <Navigation
              navLinks={navLinks.length > 0 ? navLinks : defaultNavLinks}
            />
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
