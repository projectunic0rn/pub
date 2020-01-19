import { Link } from 'gatsby';
import React, { FC } from 'react';
import styled from 'styled-components';

import { useSiteMetadata } from '@hooks';
import { puLogo } from '@images';

const Logo = styled.img.attrs({ src: puLogo })`
  margin: 0;
  width: 8em;

  @media screen and (max-width: ${({ theme }) => theme.sizes.width.small}) {
    height: 2.1875em;
  }
`;

const Brand: FC = () => {
  const siteMetadata = useSiteMetadata();

  return (
    <Link to="/" title={siteMetadata.title}>
      <Logo alt={siteMetadata.title} />
    </Link>
  );
};

export default Brand;
