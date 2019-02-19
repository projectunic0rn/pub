module.exports = {
  siteMetadata: {
    title: 'Project Unicorn Blog',
    description:
      'Project Unicorn is an online community that is focused on learning by building and shipping meaningful software',
    author: '@rmjordas',
  },
  plugins: [
    'gatsby-transformer-yaml',
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
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
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          '@': 'src',
          '@components': 'src/components',
          '@images': 'src/images',
          '@pages': 'src/pages',
          '@styles': 'src/styles/index',
          '@templates': 'src/templates',
          '@utils': 'src/utils',
          '@config': 'src/config',
          '@styled-components': 'src/styled-components',
        },
        extensions: ['ts', 'tsx', 'png', 'jpg', 'jpeg', 'gif'],
      },
    },
    'gatsby-plugin-styled-components',
    'gatsby-plugin-typescript',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Project Unicorn Blog',
        short_name: 'pub',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        display: 'minimal-ui',
        icon: 'src/images/unicorn-icon.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-offline',
  ],
  mapping: {
    'MarkdownRemark.frontmatter.author': `AuthorYaml`,
  },
};
