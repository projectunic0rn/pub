const {
  pathPrefix,
  mailChimpAPI,
  manifestOptions,
  siteMetadata,
  googleAnalyticsTrackingId,
} = require('./site.config');

module.exports = {
  pathPrefix,
  siteMetadata,
  plugins: [
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/styles/typography',
        omitGoogleFont: true,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content`,
        name: 'content',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              offsetY: 100,
              icon:
                '<svg aria-hidden="true" height="20" version="1.1" viewBox="0 0 16 16" width="20"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>',
              className: 'heading-anchor',
              maintainCase: true,
              removeAccents: true,
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: true,
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 500,
            },
          },
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'nofollow noopener noreferrer',
            },
          },
          'gatsby-remark-responsive-iframe',
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: siteMetadata.siteUrl,
        stripQueryString: true,
      },
    },
    {
      resolve: 'gatsby-plugin-alias-imports',
      options: {
        alias: {
          '@api': 'src/api',
          '@components': 'src/components',
          '@contexts': 'src/contexts',
          '@helpers': 'src/helpers',
          '@hooks': 'src/hooks',
          '@images': 'src/images',
          '@mocks': 'src/mocks',
          '@pages': 'src/pages',
          '@styles': 'src/styles',
          '@templates': 'src/templates',
          '@utils': 'src/utils',
          '@static': 'static',
        },
        extensions: ['ts', 'tsx', 'png', 'jpg', 'jpeg', 'gif'],
      },
    },
    'gatsby-plugin-catch-links',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-typescript',
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-yaml',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-sharp',

    {
      resolve: 'gatsby-plugin-manifest',
      options: manifestOptions,
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: siteMetadata.siteUrl,
        sitemap: `${siteMetadata.siteUrl}/sitemap.xml`,
        resolveEnv: () => process.env.GATSBY_ACTIVE_ENV || 'next',
        env: {
          next: {
            policy: [{ userAgent: '*', disallow: ['/'] }],
          },
          release: {
            policy: [{ userAgent: '*', allow: '/' }],
          },
        },
      },
    },
    'gatsby-plugin-offline',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: googleAnalyticsTrackingId,
        head: true,
        anonymize: true,
        respectDNT: true,
        sampleRate: 100,
        siteSpeedSampleRate: 10,
      },
    },
    {
      resolve: 'gatsby-plugin-mailchimp',
      options: {
        endpoint: mailChimpAPI,
      },
    },
    {
      resolve: 'gatsby-plugin-create-client-paths',
      options: { prefixes: ['/profile/*', '/projects/*'] },
    },
  ],
  mapping: {
    'MarkdownRemark.frontmatter.author': 'AuthorYaml',
  },
};
