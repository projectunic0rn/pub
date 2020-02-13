import { graphql } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import React, { FC } from 'react';

import { Card, CardList, Pagination } from '@components/blog';
import { Container, Layout, PageTitle, Seo } from '@components/shared';
import { useDefaultPostImage, useSiteMetadata } from '@hooks';

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

interface TagTemplateProps {
  data: {
    totalCount: number;
    allMarkdownRemark: {
      nodes: PostNode[];
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
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
      limit: $limit
      skip: $skip
    ) {
      totalCount
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

/** Used by Gatsby to display the list of tags used in blog posts. */
const TagTemplate: FC<TagTemplateProps> = ({ data, pageContext }) => {
  const siteMetadata = useSiteMetadata();
  const defaultPostImage = useDefaultPostImage();
  const { nodes } = data.allMarkdownRemark;
  const { tag: title, slug, totalPosts, currentPage } = pageContext;
  const numberOfPosts = nodes.length;
  const isFirstPage = currentPage === 1;

  return (
    <Layout>
      {isFirstPage ? (
        <Seo
          title={`Tag: "${title}" - ${siteMetadata.title}`}
          urlSlug={`blog/tag/${slug}/`}
        />
      ) : (
        <Seo
          title={`Tag: "${title}" - Page ${currentPage} - ${siteMetadata.title}`}
          urlSlug={`blog/tag/${slug}/`}
        />
      )}

      <Container>
        <PageTitle size="small">
          {totalPosts} Post{numberOfPosts > 1 ? 's' : ''} Tagged: &ldquo;{title}
          &rdquo;
        </PageTitle>

        <CardList>
          {nodes.map(({ fields, frontmatter, excerpt }) => (
            <Card
              key={fields.slug}
              slug={fields.slug}
              excerpt={excerpt}
              fluid={
                frontmatter.image
                  ? frontmatter.image.childImageSharp.fluid
                  : defaultPostImage.childImageSharp.fluid
              }
              publishDate={frontmatter.date}
              title={frontmatter.title || fields.slug}
            />
          ))}
        </CardList>
      </Container>

      <Pagination prefix={`blog/tag/${slug}`} context={pageContext} />
    </Layout>
  );
};

export default TagTemplate;
