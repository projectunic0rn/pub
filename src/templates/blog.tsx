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
import { useSiteMetadata } from '@hooks';

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

/** Used by Gatsby to display the list of blog posts at the blog index page. */
const BlogTemplate: React.FC<BlogTemplateProps> = ({ data, pageContext }) => {
  const siteMetadata = useSiteMetadata();
  const posts = data.allMarkdownRemark.edges;
  const { currentPage } = pageContext;
  const isFirstPage = currentPage === 1;

  return (
    <Layout>
      <Seo title="Blog" />

      {!isFirstPage && (
        <Helmet>
          <title>{`Page ${currentPage} - ${siteMetadata.title}`}</title>
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
