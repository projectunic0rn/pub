require('dotenv').config();

const path = require('path');

const requiredKeys = {
  /**
   * Used by `gatsby-plugin-google-analytics`. This value is provided through
   * the `.env` file located the root of the project.
   */
  googleAnalyticsTrackingId: process.env.GA_TRACKING_ID,
};

Object.entries(requiredKeys).forEach(([k, v]) => {
  if (typeof v === 'undefined') {
    throw new Error(`${k} not provided.`);
  }
});

module.exports = Object.freeze({
  ...requiredKeys,
  /** Used by Gatsby when creating production build of the website. */
  pathPrefix: '/',
  /** Number of posts to be shown on the first page of the blog index page. */
  postsPerFirstPage: 6,
  /** Number of posts to be shown on next blog post list pages. */
  postsPerPage: 6,
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
      'A virtual co-working space to learn, build, and ship meaningful software.',
    /** The url of the website. */
    url: 'https://projectunicorn.net',
    logo: path.resolve(__dirname, 'src/images/logo.png'),
    /** Contains the project's social handles. */
    social: {
      /** The website's Facebook username, */
      facebook: '',
      /** The website's Instagram username. */
      instagram: 'projectunicorn1',
      /** The website's Twitter username. */
      twitter: '@projectunicorn2',
      /** The website's LinkedIn username. */
      linkedin: 'proj-unicorn',
      /** The website's Reddit username. */
      reddit: 'projectUnicorn',
      /** The website's GitHub username. */
      github: 'projectunic0rn',
      /** Slack invite link. */
      slackInvite:
        '//join.slack.com/t/project-unic0rn/shared_invite/enQtNDI1MDM2NjIxNjMyLTMwNTdmNjAyMmZhMTM1YWU0OTY2NzAyM2EwMWU1MGVlOTdmYzg5YzM3YThiMzdmZDE4NTI5MDQ3MjYxYTg4OTA',
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
    icon: 'src/images/logo.png',
    /* eslint-enable @typescript-eslint/camelcase */
  },
});
