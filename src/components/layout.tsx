import { graphql, StaticQuery } from 'gatsby';
import * as React from 'react';
import styled from 'styled-components';

import Header from './header';

const ChildrenWrapper = styled.div`
  margin: 0 auto;
  max-width: 40rem;
  padding: 0 1.0875rem 1.45rem;
`;

const Layout: React.FunctionComponent = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={(data) => (
      <React.Fragment>
        <Header siteTitle={data.site.siteMetadata.title} />

        <ChildrenWrapper>{children}</ChildrenWrapper>
      </React.Fragment>
    )}
  />
);

export default Layout;
