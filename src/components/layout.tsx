import { graphql, StaticQuery } from 'gatsby';
import * as React from 'react';

import Header from './header';

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

        <div
          style={{
            margin: '0 auto',
            maxWidth: '40rem',
            padding: '0px 1.0875rem 1.45rem',
            paddingTop: 0,
          }}
        >
          {children}
        </div>
      </React.Fragment>
    )}
  />
);

export default Layout;
