import { graphql } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import React, { FC } from 'react';

import { Hero, PostLinks, PostMeta, PostTags, Share } from '@components/blog';
import { Container, Layout, PageBody, Seo } from '@components/shared';
import {
  useDefaultAvatarImage,
  useDefaultPostImage,
  useSiteMetadata,
} from '@hooks';

export interface PostNode {
  id: string;
  excerpt: string;
  fields: { slug: string };
  html: string;
  frontmatter: {
    title: string;
    date: string;
    tags?: string[];
    author: Author;
    image: {
      childImageSharp: {
        fluid: FluidObject;
      };
    };
  };
}
export interface Author {
  id: string;
  name: string;
  github: string;
  twitter?: string;
  bio?: string;
  avatar?: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
}

interface BlogPostTemplateProps {
  data: {
    markdownRemark: PostNode;
  };
  pageContext: {
    previous: PostNode;
    next: PostNode;
  };
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      fields {
        slug
      }
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        tags
        author {
          id
          name
          bio
          github
          avatar {
            childImageSharp {
              fluid(maxWidth: 68) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        image {
          childImageSharp {
            fluid(maxWidth: 1800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;

/** Used by Gatsby to display a single blog post. */
const BlogPostTemplate: FC<BlogPostTemplateProps> = ({ data, pageContext }) => {
  const defaultAvatarImage = useDefaultAvatarImage();
  const defaultPostImage = useDefaultPostImage();
  const siteMetadata = useSiteMetadata();
  const post = data.markdownRemark;
  const { excerpt, frontmatter, fields } = post;
  const { title, tags, date, author, image } = frontmatter;
  const { previous, next } = pageContext;
  const { slug } = fields;

  if (!author.avatar) {
    author.avatar = {
      childImageSharp: defaultAvatarImage.childImageSharp,
    };
  }

  return (
    <Layout>
      <Seo
        title={title}
        description={post.excerpt}
        twitter={author.twitter}
        author={author.name}
        urlSlug={`blog/${slug}/`}
        image={siteMetadata.siteUrl + image.childImageSharp.fluid.src}
        pageType="article"
        publishedAt={new Date(date).toISOString()}
        keywords={tags}
      />

      <Hero
        title={title}
        fluid={
          image
            ? image.childImageSharp.fluid
            : defaultPostImage.childImageSharp.fluid
        }
        height="50vh"
      />

      <Container>
        <PostMeta date={date} author={author} />
        <PageBody body={post.html} />
        {tags && <PostTags tags={tags} />}
        <Share post={{ title, slug, excerpt }} />
      </Container>

      <PostLinks prefix="blog" previous={previous} next={next} />
    </Layout>
  );
};

export default BlogPostTemplate;
