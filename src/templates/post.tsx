import { graphql } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import * as React from 'react';

import {
  Container,
  Hero,
  Layout,
  PageBody,
  PostLinks,
  PostMeta,
  PostTags,
  Seo,
  Share,
} from '@components';

export interface PostNode {
  id: string;
  excerpt: string;
  fields: { slug: string };
  html: string;
  frontmatter: {
    title: string;
    date: string;
    tags?: string[];
    author: Author;
    image: {
      childImageSharp: {
        fluid: FluidObject;
      };
    };
  };
}
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

interface BlogPostTemplateProps {
  data: {
    allFile: {
      nodes: {
        name: string;
        childImageSharp: {
          fluid: FluidObject;
        };
      }[];
    };
    markdownRemark: PostNode;
  };
  pageContext: {
    previous: PostNode;
    next: PostNode;
  };
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    allFile(filter: { absolutePath: { regex: "/images/default/" } }) {
      nodes {
        name
        childImageSharp {
          fluid(maxWidth: 1800) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      fields {
        slug
      }
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        tags
        author {
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
`;

/** Used by Gatsby to display a single blog post. */
const BlogPostTemplate: React.FC<BlogPostTemplateProps> = ({
  data,
  pageContext,
}) => {
  const allFileNodes = data.allFile.nodes;
  const post = data.markdownRemark;
  const { excerpt, frontmatter, fields } = post;
  const { title, tags, date, author, image } = frontmatter;
  const { previous, next } = pageContext;
  const { slug } = fields;
  // @TODO+author.tsx: Create new StaticQuery hook, e.g. useDefaultImage
  const defaultImages: { [key: string]: { fluid: FluidObject } } = {};

  allFileNodes.forEach(
    ({ name, childImageSharp }) => (defaultImages[name] = childImageSharp),
  );

  if (!author.avatar) {
    author.avatar = {
      childImageSharp: defaultImages['default-avatar-image'],
    };
  }

  return (
    <Layout>
      <Seo
        title={title}
        description={post.excerpt}
        twitter={author.twitter}
        author={author.name}
        urlSlug={slug}
        pageType="article"
      />

      <Hero
        title={title}
        fluid={
          image
            ? image.childImageSharp.fluid
            : defaultImages['default-post-image'].fluid
        }
        height="50vh"
      />

      <Container>
        <PostMeta date={date} author={author} />
        <PageBody body={post.html} />
        {tags && <PostTags tags={tags} />}
        <Share post={{ title, slug, excerpt }} />
      </Container>

      <PostLinks prefix="blog" previous={previous} next={next} />
    </Layout>
  );
};

export default BlogPostTemplate;
