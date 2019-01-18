import { graphql, Link } from 'gatsby';
import * as React from 'react';

import Image from '../components/image';
import Layout from '../components/layout';
import Seo from '../components/seo';

import './index.css';

interface PostNode {
  node: {
    excerpt: string;
    frontmatter: {
      date: string;
      title: string;
    };
    fields: {
      slug: string;
    };
  };
}

interface IndexPageProps {
  data: {
    site: {
      siteMetadata: {
        siteName: string;
      };
    };
    allMarkdownRemark: {
      edges: PostNode[];
    };
  };
}

const IndexPage: React.FunctionComponent<IndexPageProps> = (props) => {
  const { data } = props;
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout>
      <Seo
        title="All posts"
        keywords={['blog', 'gatsby', 'javascript', 'react']}
      />

      <div style={{ maxWidth: '300px', marginBottom: '1.45rem' }}>
        <Image />
      </div>

      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug;

        return (
          <div key={node.fields.slug}>
            <h3
              style={{
                marginBottom: '0.25rem',
              }}
            >
              <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
                {title}
              </Link>
            </h3>

            <small>{node.frontmatter.date}</small>

            <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
          </div>
        );
      })}
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`;
