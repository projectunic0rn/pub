import { Link } from 'gatsby';
import * as React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';

const Tittle = styled.p`
  background: ${({ theme }) => theme.colors.baseinvert};
`;

const Header = () => {
  return (
    <header
      data-testid="header"
      style={{
        background: `rebeccapurple`,
        marginBottom: `1.45rem`,
      }}
    >
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `1.45rem 1.0875rem`,
        }}
      >
        <h1 style={{ margin: 0 }}>
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            <Tittle>header</Tittle>
          </Link>
        </h1>
      </div>
    </header>
  );
};

interface HeaderProps {
  siteTitle?: string;
}

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
