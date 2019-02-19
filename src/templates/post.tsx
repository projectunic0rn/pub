import { graphql } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import * as React from 'react';
import Helmet from 'react-helmet';

import Container from '@components/container';
import Hero from '@components/hero';
import Layout from '@components/layout';
import PageBody from '@components/page-body';
import PostLinks from '@components/post-links';
import PostMeta from '@components/post-meta';
import PostTags from '@components/post-tags';
import Seo from '@components/seo';
import { site } from '@config/site';

export interface Author {
  id: string;
  name: string;
  github: string;
  bio?: string;
  avatar: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
}

interface BlogPostTemplateProps {
  data: {
    site: {
      siteMetadata: {
        title: string;
      };
    };
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
        tags: string[];
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
    site {
      siteMetadata {
        title
        author
      }
    }
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
      <Helmet>{`${title} - ${site.title}`}</Helmet>
      <Seo title={title} description={post.excerpt} />

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

      <PostLinks previous={previous} next={next} />
    </Layout>
  );
};

export default BlogPostTemplate;
