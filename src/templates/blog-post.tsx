import { graphql, Link } from 'gatsby';
import * as React from 'react';

import Layout from '../components/layout';
import Seo from '../components/seo';

interface BlogPostTemplateProps {
  data: {
    site: {
      siteMetadata: {
        title: string;
      };
    };
    markdownRemark: {
      id: string;
      excerpt: string;
      html: string;
      frontmatter: {
        title: string;
        date: string;
      };
    };
  };
  pageContext: {
    previous: any;
    next: any;
  };
}

const BlogPostTemplate: React.FunctionComponent<BlogPostTemplateProps> = (
  props,
) => {
  const post = props.data.markdownRemark;
  const { previous, next } = props.pageContext;

  return (
    <Layout>
      <Seo title={post.frontmatter.title} description={post.excerpt} />

      <h1>{post.frontmatter.title}</h1>

      <p
        style={{
          display: 'block',
          marginBottom: '1rem',
          marginTop: '-rem',
        }}
      >
        {post.frontmatter.date}
      </p>

      <div dangerouslySetInnerHTML={{ __html: post.html }} />

      <hr
        style={{
          marginBottom: '14px',
        }}
      />

      <ul
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          listStyle: 'none',
          padding: 0,
        }}
      >
        <li>
          {previous && (
            <Link to={previous.fields.slug} rel="prev">
              ← {previous.frontmatter.title}
            </Link>
          )}
        </li>

        <li>
          {next && (
            <Link to={next.fields.slug} rel="next">
              {next.frontmatter.title} →
            </Link>
          )}
        </li>
      </ul>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;
