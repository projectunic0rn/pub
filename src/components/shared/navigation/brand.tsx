import { Link } from 'gatsby';
import React, { FC } from 'react';
import styled from 'styled-components';

import { useSiteMetadata } from '@hooks';
import { puLogo } from '@images';

interface OwnProps {
  to?: string;
  title?: string;
}

type BrandProps = OwnProps;

const Logo = styled.img.attrs({ src: puLogo, alt: 'Project Unicorn' })`
  margin: 0;
  width: 8em;

  @media screen and (max-width: ${({ theme }) => theme.sizes.width.small}) {
    height: 2.1875em;
  }
`;

const Brand: FC<BrandProps> = ({ to = '/', title }) => {
  const siteMetadata = useSiteMetadata();

  return (
    <Link to={to} title={`${title || siteMetadata.title}`}>
      <Logo />
    </Link>
  );
};

export default Brand;
