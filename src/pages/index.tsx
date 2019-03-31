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

const Logo = styled.img.attrs({
  src: puLogo,
  alt: 'Project Unicorn',
  title: 'Project Unicorn',
})`
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

const IndexPage: React.FC = () => {
  const siteMetadata = useSiteMetadata();

  return (
    <Wrapper>
      <Seo title="Home" />

      <Inner>
        <Logo />
        <Subtitle>{siteMetadata.description}</Subtitle>
        <Anchor
          href="//join.slack.com/t/project-unic0rn/shared_invite/enQtNDI1MDM2NjIxNjMyLTMwNTdmNjAyMmZhMTM1YWU0OTY2NzAyM2EwMWU1MGVlOTdmYzg5YzM3YThiMzdmZDE4NTI5MDQ3MjYxYTg4OTA"
          content="Slack"
          title="Project Unicorn Slack invite link"
        />{' '}
        |{' '}
        <Anchor
          href="//github.com/projectunic0rn"
          content="GitHub"
          title="Project Unicorn GitHub organization"
        />{' '}
        |{' '}
        <Link to="/blog" title="Project Unicorn blog">
          Blog
        </Link>
      </Inner>
    </Wrapper>
  );
};

export default IndexPage;
