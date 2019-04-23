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
}

interface BlogTemplateProps {
  data: {
    file: {
      childImageSharp: {
        fluid: FluidObject;
      };
    };
    allMarkdownRemark: {
      nodes: PostNode[];
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
      nodes {
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
`;

/** Used by Gatsby to display the list of blog posts at the blog index page. */
const BlogTemplate: React.FC<BlogTemplateProps> = ({ data, pageContext }) => {
  const siteMetadata = useSiteMetadata();
  const { nodes } = data.allMarkdownRemark;
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
          {nodes.map(({ fields, excerpt, frontmatter }, i) => (
            <Card
              featured={isFirstPage && i === 0}
              key={fields.slug}
              slug={fields.slug}
              excerpt={excerpt}
              fluid={
                frontmatter.image
                  ? frontmatter.image.childImageSharp.fluid
                  : data.file.childImageSharp.fluid
              }
              publishDate={frontmatter.date}
              title={frontmatter.title || fields.slug}
            />
          ))}
        </CardList>
      </Container>

      <Pagination prefix="blog" context={pageContext} />
    </Layout>
  );
};

export default BlogTemplate;
