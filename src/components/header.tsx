import { Link } from 'gatsby';
import * as React from 'react';

import styled from '../styled-components';

interface HeaderProps {
  siteTitle?: string;
}

const Wrapper = styled.div`
  background: rebeccapurple;
  margin-bottom: 1.45rem;
`;

const InnerWrapper = styled.div`
  margin: 0 auto;
  max-width: 40rem;
  padding: 1.45rem 1.0875rem;
`;

const SiteTitle = styled.h1`
  margin: 0;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
`;

const Header: React.FunctionComponent<HeaderProps> = ({ siteTitle = '' }) => (
  <Wrapper>
    <InnerWrapper>
      <SiteTitle>
        <StyledLink to="/">{siteTitle}</StyledLink>
      </SiteTitle>
    </InnerWrapper>
  </Wrapper>
);

export default Header;
