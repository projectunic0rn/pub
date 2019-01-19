import { graphql, Link } from 'gatsby';
import * as React from 'react';

import Layout from '@components/layout';
import Seo from '@components/seo';
import styled from '@styled-components';

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

const PostDate = styled.p`
  display: block;
  margin-bottom: 1rem;
  margin-top: -1rem;
`;

const Hr = styled.hr`
  margin-bottom: 14px;
`;

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  padding: 0;
`;

const BlogPostTemplate: React.FunctionComponent<BlogPostTemplateProps> = (
  props,
) => {
  const post = props.data.markdownRemark;
  const { previous, next } = props.pageContext;

  return (
    <Layout>
      <Seo title={post.frontmatter.title} description={post.excerpt} />

      <h1>{post.frontmatter.title}</h1>

      <PostDate>{post.frontmatter.date}</PostDate>

      <div dangerouslySetInnerHTML={{ __html: post.html }} />

      <Hr />

      <List>
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
      </List>
    </Layout>
  );
};

export default BlogPostTemplate;
