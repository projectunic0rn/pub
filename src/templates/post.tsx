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
} from '@components';

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
    previous: any;
    next: any;
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
          twitter
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
  const { title, tags, date, author } = post.frontmatter;
  const { previous, next } = pageContext;
  const { image } = post.frontmatter;

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
      </Container>

      <PostLinks prefix="blog" previous={previous} next={next} />
    </Layout>
  );
};

export default BlogPostTemplate;
