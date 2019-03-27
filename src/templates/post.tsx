import { graphql } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import * as React from 'react';

import {
  Container,
  Hero,
  Layout,
  PageBody,
  PostLinks,
  PostMeta,
  PostTags,
  Seo,
  Share,
} from '@components';

interface PostNode {
  fields: { slug: string };
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
    file: {
      childImageSharp: {
        fluid: FluidObject;
      };
    };
    markdownRemark: {
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
    };
  };
  pageContext: {
    previous: PostNode;
    next: PostNode;
  };
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    file(relativePath: { eq: "default-post-image.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
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
              fluid(maxWidth: 1800) {
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

const BlogPostTemplate: React.FunctionComponent<BlogPostTemplateProps> = ({
  data,
  pageContext,
}) => {
  const post = data.markdownRemark;
  const { excerpt, frontmatter, fields } = post;
  const { title, tags, date, author, image } = frontmatter;
  const { previous, next } = pageContext;
  const { slug } = fields;

  return (
    <Layout>
      <Seo title={title} description={post.excerpt} twitter={author.twitter} />

      <Hero
        title={title}
        fluid={
          image ? image.childImageSharp.fluid : data.file.childImageSharp.fluid
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