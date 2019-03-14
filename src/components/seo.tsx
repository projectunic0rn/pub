import * as React from 'react';
import Helmet from 'react-helmet';

import { useSiteMetadata } from '@hooks';

interface Meta {
  content: string;
  name: string;
}

interface SeoProps {
  title: string;
  description?: string;
  keywords?: string[];
  lang?: string;
  meta?: Meta[];
  twitter?: string;
}

const Seo: React.FunctionComponent<SeoProps> = ({
  title,
  description,
  keywords = [],
  lang = 'en',
  meta = [],
  twitter,
}) => {
  const siteMetadata = useSiteMetadata();
  const metaDescription = description || siteMetadata.description;

  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={title}
      titleTemplate={`%s - ${siteMetadata.title}`}
      meta={[
        {
          content: metaDescription,
          name: 'description',
        },
        {
          content: siteMetadata.url,
          name: 'og:url',
        },
        {
          content: 'en',
          name: 'og:locale',
        },
        {
          content: siteMetadata.title,
          name: 'og:site_name',
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
          content: twitter || siteMetadata.social.twitter,
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
