import { graphql } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import * as React from 'react';
import Helmet from 'react-helmet';

import {
  AuthorMeta,
  Card,
  CardList,
  Container,
  Layout,
  Pagination,
} from '@components';
import { useSiteMetadata } from '@hooks';

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

interface AuthorTemplateProps {
  data: {
    file: {
      childImageSharp: {
        fluid: FluidObject;
      };
    };
    totalCount: number;
    allMarkdownRemark: {
      edges: PostNode[];
    };
    authorYaml: Author;
  };
  pageContext: {
    totalPosts: number;
    slug: string;
    limit?: number;
    skip?: number;
    numPages?: number;
    currentPage?: number;
  };
}

export const authorQuery = graphql`
  query($authorId: String, $skip: Int!, $limit: Int!) {
    file(relativePath: { eq: "default-post-image.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    authorYaml(id: { eq: $authorId }) {
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
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { author: { eq: $authorId } } }
      limit: $limit
      skip: $skip
    ) {
      totalCount
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

const AuthorTemplate: React.FC<AuthorTemplateProps> = ({
  data,
  pageContext,
}) => {
  const siteMetadata = useSiteMetadata();
  const author = data.authorYaml;
  const posts = data.allMarkdownRemark.edges;
  const { slug, currentPage } = pageContext;
  const isFirstPage = currentPage === 1;
  const authorName = author.name;

  return (
    <Layout>
      {isFirstPage ? (
        <Helmet>
          <title>{`Author: "${authorName}" - ${siteMetadata.title}`}</title>

          <meta
            property="og:title"
            content={`Author: "${authorName}" - ${siteMetadata.title}`}
            name="title"
            data-react-helmet="true"
          />

          <meta
            property="og:url"
            content={`${siteMetadata.url}/blog/author/${slug}/`}
            data-react-helmet="true"
          />
        </Helmet>
      ) : (
        <Helmet>
          <title>{`Author: "${authorName}" - Page ${currentPage} - ${
            siteMetadata.title
          }`}</title>

          <meta
            property="og:title"
            content={`Author: "${authorName}" - Page ${currentPage} - ${
              siteMetadata.title
            }`}
            name="title"
            data-react-helmet="true"
          />

          <meta
            property="og:url"
            content={`${siteMetadata.url}/blog/author/${slug}/`}
            data-react-helmet="true"
          />
        </Helmet>
      )}

      <Container>
        <AuthorMeta author={author} />

        <CardList>
          {posts.map(({ node }) => (
            <Card
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

      <Pagination prefix={`blog/author/${author.id}`} context={pageContext} />
    </Layout>
  );
};

export default AuthorTemplate;
