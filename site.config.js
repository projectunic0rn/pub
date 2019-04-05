const path = require('path');

module.exports = {
  /** Used by Gatsby when creating production build of the website. */
  pathPrefix: '/',
  /** Number of posts to be shown on the first page of the blog index page. */
  postsPerFirstPage: 7,
  /** Number of posts to be shown on next blog post list pages. */
  postsPerPage: 6,
  /** Used by `gatsby-plugin-google-analytics`. */
  googleAnalyticsTrackingId: 'UA-135765468-1',
  /**
   * Information about the website. Can be accessed by components by calling
   * the `useSiteMetadata` custom React hook.
   */
  siteMetadata: {
    /** The name of the website. */
    title: 'Project Unicorn',
    titleShort: 'PU',
    /** The description of the website. */
    description:
      'Project Unicorn is an online community that is focused on learning by building and shipping meaningful software.',
    /** The url of the website. */
    url: 'https://projectunicorn.net',
    logo: path.resolve(__dirname, 'src/images/unicorn-icon.png'),
    /** Contains the project's social handles. */
    social: {
      /** The websites Twitter handle. */
      twitter: '@projectunicorn2',
    },
  },
  manifestOptions: {
    /* eslint-disable @typescript-eslint/camelcase */
    name: 'Project Unicorn',
    short_name: 'PU',
    start_url: '/',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    display: 'minimal-ui',
    icon: 'src/images/unicorn-icon.png',
    /* eslint-enable @typescript-eslint/camelcase */
  },
};
