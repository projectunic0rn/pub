import * as React from 'react';
import Helmet from 'react-helmet';

import { useSiteMetadata } from '@hooks';

interface Meta {
  content: string;
  name: string;
}

interface SeoProps {
  title: string;
  urlSlug?: string;
  description?: string;
  keywords?: string[];
  lang?: string;
  meta?: Meta[];
  twitter?: string;
  author?: string;
  image?: string;
  pageType?: 'website' | 'article';
}

const Seo: React.FC<SeoProps> = ({
  title,
  urlSlug = '',
  description,
  keywords = [],
  lang = 'en',
  meta = [],
  twitter,
  author,
  image,
  pageType = 'website',
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
          content: author || 'Project Unicorn',
          name: 'author',
        },
        {
          content: metaDescription,
          name: 'description',
        },
        {
          content: image || 'https://projectunicorn.net/apple-touch-icon.png',
          property: 'og:image',
        },
        {
          content: metaDescription,
          property: 'og:description',
        },
        {
          content: `${siteMetadata.url}/${urlSlug}`,
          property: 'og:url',
        },
        {
          content: 'en',
          property: 'og:locale',
        },
        {
          content: siteMetadata.title,
          property: 'og:site_name',
        },
        {
          content: title,
          property: 'og:title',
        },
        {
          content: pageType,
          property: 'og:type',
        },
        {
          content: 'summary',
          name: 'twitter:card',
        },
        {
          content: siteMetadata.social.twitter,
          name: 'twitter:site',
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
