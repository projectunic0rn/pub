import { Link } from 'gatsby';
import * as React from 'react';

import { Seo } from '@components';
import { useSiteMetadata } from '@hooks';
import puLogo from '@images/pu.svg';
import styled from '@styled-components';

const Wrapper = styled.div`
  align-items: center;
  background-color: #ededed;
  display: flex;
  height: 100vh;
  justify-content: center;
`;

const Inner = styled.div`
  color: #121212;
  margin: 0;
  padding: 0 3.75em;
  text-align: center;
`;

const Logo = styled.img.attrs({ src: puLogo, alt: 'Project Unicorn' })`
  margin: 0 auto;
  width: 100%;
  max-width: 20em;
`;

const Subtitle = styled.p`
  font-size: 1.2em;
  font-weight: 300;
  line-height: 1.65;
  margin: 0 auto 1em;
  max-width: 25em;
`;

const IndexPage: React.FunctionComponent = () => {
  const siteMetadata = useSiteMetadata();

  return (
    <Wrapper>
      <Seo title="Home" />

      <Inner>
        <Logo />
        <Subtitle>{siteMetadata.description}</Subtitle>
        <Link to="/blog">Blog</Link> |{' '}
        <a
          href="https://github.com/projectunic0rn"
          rel="nofollow noopener noreferrer"
          target="_blank"
        >
          GitHub
        </a>
      </Inner>
    </Wrapper>
  );
};

export default IndexPage;
