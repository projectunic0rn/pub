import * as React from 'react';

import { SocialIcon } from '@components';
import { useSiteMetadata } from '@hooks';
import { makeShareUrl } from '@utils';
import styled from '@styled-components';

interface ShareProps {
  /** Contains information about a blog post. */
  post: {
    /** The title of the blog post. */
    title: string;
    /** The URL path. */
    slug: string;
    /** A short preview of the blog post. */
    excerpt: string;
  };
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const List = styled.div`
  max-width: ${({ theme }) => theme.sizes.maxWidthCentered};
  display: flex;
  flex-direction: row;
  margin: 0 auto 1em auto;

  svg {
    path {
      fill: ${({ theme }) => theme.colors.text};
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
  font-weight: 800;
`;

/** Displays icons that link to social sites' share endpoints. */
const Share: React.FC<ShareProps> = ({ post }) => {
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
          href={makeShareUrl('facebook', { u: postUrl })}
        />
        <SocialIcon
          link
          socialName="twitter"
          title={`Share "${post.title}" on Twitter`}
          href={makeShareUrl('twitter', {
            text: post.title,
            url: postUrl,
            via: twitterHandle,
          })}
        />
        <SocialIcon
          link
          socialName="linkedin"
          title={`Share "${post.title}" on LinkedIn`}
          href={makeShareUrl('linkedin', { url: postUrl })}
        />
        <SocialIcon
          link
          socialName="reddit"
          title={`Share "${post.title}" on Reddit`}
          href={makeShareUrl('reddit', { url: postUrl })}
        />
      </List>
    </Wrapper>
  );
};

export default Share;
