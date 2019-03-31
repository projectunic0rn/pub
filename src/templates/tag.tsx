import { graphql } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import * as React from 'react';
import Helmet from 'react-helmet';

import {
  Card,
  CardList,
  Container,
  Layout,
  PageTitle,
  Pagination,
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

interface TagTemplateProps {
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
  };
  pageContext: {
    tag: string;
    slug: string;
    totalPosts: number;
    limit?: number;
    skip?: number;
    numPages?: number;
    currentPage?: number;
  };
}

export const tagQuery = graphql`
  query($tag: String, $skip: Int!, $limit: Int!) {
    file(relativePath: { eq: "default-post-image.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
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

const TagTemplate: React.FC<TagTemplateProps> = ({ data, pageContext }) => {
  const siteMetadata = useSiteMetadata();
  const posts = data.allMarkdownRemark.edges;
  const { tag: title, slug, totalPosts, currentPage } = pageContext;
  const numberOfPosts = posts.length;
  const isFirstPage = currentPage === 1;

  return (
    <Layout>
      {isFirstPage ? (
        <Helmet>
          <title>{`Tag: "${title}" - ${siteMetadata.title}`}</title>

          <meta
            property="og:title"
            content={`Tag: "${title}" - ${siteMetadata.title}`}
            name="title"
            data-react-helmet="true"
          />

          <meta
            property="og:url"
            content={`${siteMetadata.url}/blog/tag/${slug}/`}
            data-react-helmet="true"
          />
        </Helmet>
      ) : (
        <Helmet>
          <title>{`Tag: "${title}" - Page ${currentPage} - ${
            siteMetadata.title
          }`}</title>

          <meta
            property="og:title"
            content={`Tag: "${title}" - Page ${currentPage} - ${
              siteMetadata.title
            }`}
            name="title"
            data-react-helmet="true"
          />

          <meta
            property="og:url"
            content={`${siteMetadata.url}/blog/tag/${slug}/`}
            data-react-helmet="true"
          />
        </Helmet>
      )}

      <Container>
        <PageTitle size="small">
          {totalPosts} Post{numberOfPosts > 1 ? 's' : ''} Tagged: &ldquo;
          {title}
          &rdquo;
        </PageTitle>

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

      <Pagination prefix="tag" context={pageContext} />
    </Layout>
  );
};

export default TagTemplate;
