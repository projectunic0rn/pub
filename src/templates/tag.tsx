import { graphql } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import * as React from 'react';
import Helmet from 'react-helmet';

import Card from '@components/card';
import CardList from '@components/card-list';
import Container from '@components/container';
import Layout from '@components/layout';
import PageTitle from '@components/page-title';
import Pagination from '@components/pagination';
import { site } from '@config/site';

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

const TagTemplate: React.FunctionComponent<TagTemplateProps> = ({
  data,
  pageContext,
}) => {
  const posts = data.allMarkdownRemark.edges;
  const { tag: title, slug, totalPosts, currentPage } = pageContext;
  const numberOfPosts = posts.length;
  const isFirstPage = currentPage === 1;

  return (
    <Layout>
      {isFirstPage ? (
        <Helmet>
          <title>{`Tag: "${title}" - ${site.title}`}</title>

          <meta
            property="og:title"
            content={`Tag: "${title}" - ${site.title}`}
          />

          <meta property="og:url" content={`${site.url}/tag/${slug}/`} />
        </Helmet>
      ) : (
        <Helmet>
          <title>{`Tag: "${title}" - Page ${currentPage} - ${
            site.title
          }`}</title>

          <meta
            property="og:title"
            content={`Tag: "${title}" - Page ${currentPage} - ${site.title}`}
          />

          <meta property="og:url" content={`${site.url}/tag/${slug}/`} />
        </Helmet>
      )}

      <Container>
        <PageTitle small={true}>
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
