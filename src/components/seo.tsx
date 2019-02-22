import { graphql, useStaticQuery } from 'gatsby';
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

interface Meta {
  content: string;
  name: string;
}

interface SeoProps {
  description?: string;
  lang?: string;
  meta?: Meta[];
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

const Seo: React.FunctionComponent<SeoProps> = ({
  description,
  keywords = [],
  lang = 'en',
  meta = [],
  title,
}) => {
  const { site }: Data = useStaticQuery(detailsQuery);

  const metaDescription = description || site.siteMetadata.description;

  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={title}
      titleTemplate={`%s - ${site.siteMetadata.title}`}
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
          content: site.siteMetadata.author,
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

export default Seo;
