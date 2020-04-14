import { graphql, useStaticQuery } from 'gatsby';

export interface SiteMetadata {
  /** The name of the website. */
  title: string;
  /** Release version of the website. */
  version: string;
  /** Text to be shown in the landing page heading. */
  tag: string;
  /** The description of the website. */
  description: string;
  /** The url of the website. */
  siteUrl: string;
  /*Email displayed on static pages */
  contactEmail: string;
  /* Contact email for Roy */
  royEmail: string;
  /** Contains the project's social handles. */
  social: {
    /** The website's Facebook username, */
    facebook: string;
    /** The website's Instagram username. */
    instagram: string;
    /** The website's Twitter username. */
    twitter: string;
    /** The website's LinkedIn username. */
    linkedin: string;
    /** The website's Reddit username. */
    reddit: string;
    /** The website's GitHub username. */
    github: string;
    /** Slack invite link. */
    slackInvite: string;
  };
}

interface Data {
  site: {
    siteMetadata: SiteMetadata;
  };
}

const siteMetadataQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        version
        tag
        description
        siteUrl
        contactEmail
        royEmail
        social {
          facebook
          instagram
          twitter
          linkedin
          reddit
          github
          slackInvite
        }
      }
    }
  }
`;

/** Custom hook that returns the site metadata. */
export const useSiteMetadata = () => {
  const { site }: Data = useStaticQuery(siteMetadataQuery);

  return site.siteMetadata;
};
