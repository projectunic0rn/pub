import { graphql } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import * as React from 'react';
import Helmet from 'react-helmet';

import {
  Card,
  CardList,
  Container,
  Layout,
  Pagination,
  Seo,
} from '@components';

interface PostNode {
  node: {
    excerpt: string;
    frontmatter: {
      date: string;
      title: string;
      image: {
        childImageSharp: {
          fluid: FluidObject;
        };
      };
    };
    fields: {
      slug: string;
    };
  };
}

interface BlogTemplateProps {
  data: {
    site: {
      siteMetadata: {
        siteName: string;
      };
    };
    file: {
      childImageSharp: {
        fluid: FluidObject;
      };
    };
    allMarkdownRemark: {
      edges: PostNode[];
    };
  };
  pageContext: {
    limit?: number;
    skip?: number;
    numPages?: number;
    currentPage?: number;
  };
}

export const pageQuery = graphql`
  query($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    file(relativePath: { eq: "default-post-image.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt(pruneLength: 80)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
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
    }
  }
`;

const BlogTemplate: React.FunctionComponent<BlogTemplateProps> = ({
  data,
  pageContext,
}) => {
  const posts = data.allMarkdownRemark.edges;
  const { currentPage } = pageContext;
  const isFirstPage = currentPage === 1;

  return (
    <Layout>
      <Seo title="Home" keywords={['blog', 'gatsby', 'typescript', 'react']} />

      {!isFirstPage && (
        <Helmet>
          <title>{`Page ${currentPage}`}</title>
        </Helmet>
      )}

      <Container>
        <CardList>
          {posts.map(({ node }, i) => (
            <Card
              featured={isFirstPage && i === 0}
              key={node.fields.slug}
              slug={node.fields.slug}
              excerpt={node.excerpt}
              fluid={
                node.frontmatter.image
                  ? node.frontmatter.image.childImageSharp.fluid
                  : data.file.childImageSharp.fluid
              }
              publishDate={node.frontmatter.date}
              title={node.frontmatter.title || node.fields.slug}
            />
          ))}
        </CardList>
      </Container>

      <Pagination prefix="blog" context={pageContext} />
    </Layout>
  );
};

export default BlogTemplate;
