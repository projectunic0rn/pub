import * as React from 'react';

import { SocialIcon } from '@components';
import { useSiteMetadata } from '@hooks';
import styled from '@styled-components';

interface ShareProps {
  post: {
    title: string;
    slug: string;
    excerpt: string;
  };
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const List = styled.div.attrs({ role: 'list' })`
  max-width: ${({ theme }) => theme.sizes.maxWidthCentered};
  display: flex;
  flex-direction: row;
  margin: 0 auto 1em auto;

  svg {
    path {
      fill: rgba(0, 0, 0, 0.73);
      opacity: 0.7;
    }
  }

  & a:hover {
    cursor: pointer;

    svg {
      path {
        fill: ${({ theme }) => theme.colors.highlight};
        opacity: 1;
      }
    }
  }
`;

const Label = styled.p`
  font-weight: 700;
`;

const Share: React.FunctionComponent<ShareProps> = ({ post }) => {
  const { social, url: siteUrl } = useSiteMetadata();
  const twitterHandle = social.twitter.replace('@', '');
  const postUrl = `${siteUrl}/blog/${post.slug}`;

  return (
    <Wrapper>
      <Label>Share this post</Label>

      <List>
        <SocialIcon
          link
          socialName="facebook"
          title={`Share "${post.title}" on Facebook`}
          href={`//www.facebook.com/sharer/sharer.php?u=${postUrl}`}
        />
        <SocialIcon
          link
          socialName="twitter"
          title={`Share "${post.title}" on Twitter`}
          href={`//twitter.com/intent/tweet?url=${postUrl}&text=${encodeURIComponent(
            post.title,
          )}&via=${twitterHandle}&hashtags=projectunicorn`}
        />
        <SocialIcon
          link
          socialName="linkedin"
          title={`Share "${post.title}" on LinkedIn`}
          href={`//www.linkedin.com/shareArticle?mini=true&url=${postUrl}&title=${encodeURIComponent(
            post.title,
          )}&summary=${encodeURIComponent(post.excerpt)}&source=${siteUrl}`}
        />
        <SocialIcon
          link
          socialName="reddit"
          title={`Share "${post.title}" on Reddit`}
          href={`//www.reddit.com/submit?url=${postUrl}`}
        />
      </List>
    </Wrapper>
  );
};

export default Share;
