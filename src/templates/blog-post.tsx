import { graphql, Link } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import * as React from 'react';

import Container from '@components/container';
import Hero from '@components/hero';
import Layout from '@components/layout';
import Seo from '@components/seo';
import styled from '@styled-components';

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
        fluid(maxWidth: 300) {
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
        image {
          childImageSharp {
            fluid(maxWidth: 700) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;

const PostDate = styled.p`
  display: block;
  margin-bottom: 1rem;
`;

const Hr = styled.hr`
  margin-bottom: 14px;
`;

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  padding: 0;
`;

const BlogPostTemplate: React.FunctionComponent<BlogPostTemplateProps> = (
  props,
) => {
  const post = props.data.markdownRemark;
  const { previous, next } = props.pageContext;
  const { image } = post.frontmatter;

  return (
    <Layout>
      <Seo title={post.frontmatter.title} description={post.excerpt} />

      <Hero
        title={post.frontmatter.title}
        fluid={
          image
            ? image.childImageSharp.fluid
            : props.data.file.childImageSharp.fluid
        }
        height={'50vh'}
      />

      <Container>
        <PostDate>{post.frontmatter.date}</PostDate>

        <div dangerouslySetInnerHTML={{ __html: post.html }} />

        <Hr />

        <List>
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>

          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </List>
      </Container>
    </Layout>
  );
};

export default BlogPostTemplate;
