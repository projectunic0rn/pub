import { graphql, StaticQuery } from 'gatsby';
import * as React from 'react';
import Helmet from 'react-helmet';

interface Data {
  site: {
    siteMetadata: {
      title: string;
      description: string;
      author: string;
    };
  };
}

interface SeoProps {
  description?: string;
  lang?: string;
  meta?: any[];
  keywords?: string[];
  title: string;
}

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`;

function renderHelmet({
  description,
  keywords,
  lang,
  meta,
  title,
}: SeoProps): (data: Data) => React.ReactNode {
  return (data) => {
    const metaDescription = description || data.site.siteMetadata.description;

    return (
      <Helmet
        htmlAttributes={{ lang }}
        title={title}
        titleTemplate={`%s - ${data.site.siteMetadata.title}`}
        meta={[
          {
            content: metaDescription,
            name: 'description',
          },
          {
            content: title,
            property: 'og:title',
          },
          {
            content: metaDescription,
            property: 'og:description',
          },
          {
            content: 'website',
            property: 'og:type',
          },
          {
            content: 'summary',
            name: 'twitter:card',
          },
          {
            content: data.site.siteMetadata.author,
            name: 'twitter:creator',
          },
          {
            content: title,
            name: 'twitter:title',
          },
          {
            content: metaDescription,
            name: 'twitter:description',
          },
        ]
          .concat(
            keywords.length > 0
              ? {
                  content: keywords.join(', '),
                  name: 'keywords',
                }
              : [],
          )
          .concat(meta)}
      />
    );
  };
}

const Seo: React.FunctionComponent<SeoProps> = (props) => (
  <StaticQuery query={detailsQuery} render={renderHelmet(props)} />
);

Seo.defaultProps = {
  keywords: [],
  lang: 'en',
  meta: [],
};

export default Seo;
