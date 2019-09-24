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
  /** MailChimp API endpoint */
  mailChimpAPI:
    'https://gmail.us3.list-manage.com/subscribe/post?u=fe25209984fd03f765b2af825&amp;id=71fee7bcba',
  /**
   * Information about the website. Can be accessed by components by calling
   * the `useSiteMetadata` custom React hook.
   */
  siteMetadata: {
    /** The name of the website. */
    title: 'Project Unicorn',
    titleShort: 'PU',
    /** Text to be shown in the landing page heading. */
    tag: 'Build something awesome.',
    /** The description of the website. */
    description:
      'Project Unicorn is a virtual co-working space of software developers around the world working together to create and deploy meaningful software.',
    /** The url of the website. */
    siteUrl: 'https://projectunicorn.net',
    /** The url of the app. */
    appUrl: 'https://projectunicorn.dev',
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
        '//join.slack.com/t/project-unic0rn/shared_invite/enQtNjM5MzkwMjE2Mzg5LTNkOWVkNDQ0NTE3NWE1MmYzYjg5YjhiZTE1NTU0MTc3NzdmNmI3YTE5ZjZhYjgzNTA0ZDUyZjFmOTJlNTg5MGQ',
    },
  },
  manifestOptions: {
    /* eslint-disable @typescript-eslint/camelcase */
    name: 'Project Unicorn',
    short_name: 'Project Unicorn',
    start_url: '/app/projects',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    display: 'minimal-ui',
    icon: 'src/images/logo.png',
    /* eslint-enable @typescript-eslint/camelcase */
  },
});
