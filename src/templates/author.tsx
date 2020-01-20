import { graphql } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import React, { FC } from 'react';

import { AuthorMeta, Card, CardList, Pagination } from '@components/blog';
import { Container, Layout, Seo } from '@components/shared';
import {
  useDefaultAvatarImage,
  useDefaultPostImage,
  useSiteMetadata,
} from '@hooks';

export interface Author {
  /** Unique ID of the author. */
  id: string;
  /** Display name of the author. */
  name: string;
  /** The author's GitHub username.  */
  github: string;
  /** The author's Twitter username. */
  twitter?: string;
  /** A short description of the author. */
  bio?: string;
  /** Used by `gatsby-image` to display the properly-sized avatar image. */
  avatar?: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
}

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

interface AuthorTemplateProps {
  data: {
    totalCount: number;
    allMarkdownRemark: {
      nodes: PostNode[];
    };
    authorYaml: Author;
  };
  pageContext: {
    authorId: string;
    authorName: string;
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
    authorYaml(id: { eq: $authorId }) {
      id
      name
      bio
      github
      avatar {
        childImageSharp {
          fluid(maxWidth: 68) {
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

/** Used by Gatsby to display the list of blog posts by author. */
const AuthorTemplate: FC<AuthorTemplateProps> = ({ data, pageContext }) => {
  const siteMetadata = useSiteMetadata();
  const defaultAvatarImage = useDefaultAvatarImage();
  const defaultPostImage = useDefaultPostImage();
  const author = data.authorYaml;
  const { nodes } = data.allMarkdownRemark;
  const { authorId, authorName, slug, currentPage } = pageContext;
  const isFirstPage = currentPage === 1;

  if (!author.avatar) {
    author.avatar = {
      childImageSharp: defaultAvatarImage.childImageSharp,
    };
  }

  return (
    <Layout>
      {isFirstPage ? (
        <Seo
          title={`Author: "${authorName}" - ${siteMetadata.title}`}
          urlSlug={`blog/author/${slug}/`}
        />
      ) : (
        <Seo
          title={`Author: "${authorName}" - Page ${currentPage} - ${siteMetadata.title}`}
          urlSlug={`blog/author/${slug}/`}
        />
      )}

      <Container>
        <AuthorMeta author={author} />

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

      <Pagination prefix={`blog/author/${authorId}`} context={pageContext} />
    </Layout>
  );
};

export default AuthorTemplate;
