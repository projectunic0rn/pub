import { Link } from 'gatsby';
import * as React from 'react';

import { Anchor, Seo } from '@components';
import { useSiteMetadata } from '@hooks';
import puLogo from '@images/pu.svg';
import styled from '@styled-components';

const Wrapper = styled.div`
  align-items: center;
  background-color: #efefef;
  display: flex;
  height: 100vh;
  justify-content: center;
`;

const Inner = styled.div`
  color: #121212;
  margin: 0;
  padding: 0 3.75em;
  text-align: center;

  a {
    transition: 0.2s;
    color: #121212;

    &:hover {
      color: #5f8ddc;
    }
  }
`;

const Logo = styled.img.attrs({ src: puLogo })`
  margin: 0 auto;
  width: 100%;
  max-width: 20em;
`;

const Subtitle = styled.p`
  font-size: 1.2em;
  font-weight: 400;
  line-height: 1.65;
  margin: 0 auto 1em;
  max-width: 25em;
`;

/** The website's landing page. */
const IndexPage: React.FC = () => {
  const siteMetadata = useSiteMetadata();

  return (
    <Wrapper>
      <Seo title="Home" />

      <Inner>
        <Logo alt={siteMetadata.title} title={siteMetadata.title} />
        <Subtitle>{siteMetadata.description}</Subtitle>
        <Anchor
          href={`${siteMetadata.social.slackInvite}`}
          content="Slack"
          title={`${siteMetadata.title} Slack invite link`}
        />{' '}
        |{' '}
        <Anchor
          href={`//github.com/${siteMetadata.social.github}`}
          content="GitHub"
          title={`${siteMetadata.title} GitHub organization`}
        />{' '}
        |{' '}
        <Link to="/blog" title={`${siteMetadata.title} blog`}>
          Blog
        </Link>
      </Inner>
    </Wrapper>
  );
};

export default IndexPage;
