const path = require('path');

module.exports = {
  pathPrefix: '/',
  postsPerFirstPage: 7,
  postsPerPage: 6,
  googleAnalyticsTrackingId: 'UA-135765468-1',
  siteMetadata: {
    title: 'Project Unicorn',
    titleShort: 'PU',
    description:
      'Project Unicorn is an online community that is focused on learning by building and shipping meaningful software.',
    url: 'https://projectunicorn.net',
    logo: path.resolve(__dirname, 'src/images/unicorn-icon.png'),
    social: {
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
