import { Link } from 'gatsby';
import * as React from 'react';

interface HeaderProps {
  siteTitle?: string;
}

const Header: React.FunctionComponent<HeaderProps> = ({ siteTitle = '' }) => (
  <div
    style={{
      background: 'rebeccapurple',
      marginBottom: '1.45rem',
    }}
  >
    <div
      style={{
        margin: '0 auto',
        maxWidth: '40rem',
        padding: '1.45rem 1.0875rem',
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: 'white',
            textDecoration: 'none',
          }}
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
  </div>
);

export default Header;
