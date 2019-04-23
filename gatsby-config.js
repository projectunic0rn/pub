const {
  pathPrefix,
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
      resolve: 'gatsby-plugin-alias-imports',
      options: {
        alias: {
          '@': 'src',
          '@components': 'src/components',
          '@images': 'src/images',
          '@pages': 'src/pages',
          '@styles': 'src/styles',
          '@templates': 'src/templates',
          '@utils': 'src/utils',
          '@styled-components': 'src/styled-components',
          '@hooks': 'src/hooks',
          '@static': 'static',
        },
        extensions: ['ts', 'tsx', 'png', 'jpg', 'jpeg', 'gif'],
      },
    },
    'gatsby-plugin-styled-components',
    'gatsby-plugin-typescript',
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-yaml',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: manifestOptions,
    },
    'gatsby-plugin-offline',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: googleAnalyticsTrackingId,
      },
    },
  ],
  mapping: {
    'MarkdownRemark.frontmatter.author': 'AuthorYaml',
  },
};
