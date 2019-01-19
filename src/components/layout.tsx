import { graphql, StaticQuery } from 'gatsby';
import * as React from 'react';
import styled from 'styled-components';

import Header from './header';

interface Data {
  site: {
    siteMetadata: {
      title: string;
    };
  };
}

const siteTitleQuery = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

const ChildrenWrapper = styled.div`
  margin: 0 auto;
  max-width: 40rem;
  padding: 0 1.0875rem 1.45rem;
`;

function renderChildren(
  children: React.ReactNode,
): (data: Data) => React.ReactNode {
  return (data) => (
    <React.Fragment>
      <Header siteTitle={data.site.siteMetadata.title} />

      <ChildrenWrapper>{children}</ChildrenWrapper>
    </React.Fragment>
  );
}

const Layout: React.FunctionComponent = ({ children }) => (
  <StaticQuery query={siteTitleQuery} render={renderChildren(children)} />
);

export default Layout;
