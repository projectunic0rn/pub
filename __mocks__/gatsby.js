const React = require('react');
const gatsby = jest.requireActual('gatsby');
const pkg = require('../package.json');

const mockUseStaticQueryImplementation = () => {
  return {
    file: {
      childImageSharp: {
        fluid: { aspectRatio: 1, src: '', srcSet: '', sizes: '' },
      },
    },
    site: {
      googleAnalyticsTrackingId: 'UA-123456789-0',
      /** Used by Gatsby when creating production build of the website. */
      pathPrefix: '',
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
        /** Release version of website. */
        version: pkg.version,
        /** Text to be shown in the landing page heading. */
        tag: 'Build something awesome.',
        /** The description of the website. */
        description:
          'Project Unicorn is a virtual co-working space of software developers around the world working together to create and deploy meaningful software.',
        /** The url of the website. */
        siteUrl: 'http://localhost:8000',
        logo: 'src/images/logo.png',
        /*Email displayed on static pages */
        contactEmail: 'team@projectunicorn.dev',
        /*Email displayed on static pages */
        royEmail: 'roy.moran@projectunicorn.dev',
        /** Contains the project's social handles. */
        social: {
          /** The website's Facebook username, */
          facebook: '',
          /** The website's Instagram username. */
          instagram: 'projectunic0rn',
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
        start_url: '/projects',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        display: 'minimal-ui',
        icon: 'src/images/logo.png',
        /* eslint-enable @typescript-eslint/camelcase */
      },
    },
  };
};

module.exports = {
  ...gatsby,
  graphql: jest.fn(),
  Link: jest.fn().mockImplementation(({ to, ...rest }) =>
    React.createElement('a', {
      ...rest,
      href: to,
    }),
  ),
  StaticQuery: jest.fn(),
  useStaticQuery: jest
    .fn()
    .mockImplementation(mockUseStaticQueryImplementation),
};
