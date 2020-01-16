import { graphql } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import React, { FC } from 'react';

import { navItems } from './nav-items';
import { Card, CardList, Pagination } from '@components/blog';
import { Container, Layout, Seo } from '@components/shared';
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

interface BlogTemplateProps {
  data: {
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
const BlogTemplate: FC<BlogTemplateProps> = ({ data, pageContext }) => {
  const siteMetadata = useSiteMetadata();
  const defaultPostImage = useDefaultPostImage();
  const { nodes } = data.allMarkdownRemark;
  const { currentPage } = pageContext;
  const isFirstPage = currentPage === 1;

  return (
    <Layout navItems={navItems}>
      {isFirstPage ? (
        <Seo title="Blog" urlSlug="blog/" />
      ) : (
        <Seo
          title={`Page ${currentPage} - ${siteMetadata.title}`}
          urlSlug="blog/"
        />
      )}

      <Container>
        <CardList>
          {nodes.map(({ fields, excerpt, frontmatter }) => (
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

      <Pagination prefix="blog" context={pageContext} />
    </Layout>
  );
};

export default BlogTemplate;
