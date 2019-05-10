import { graphql, useStaticQuery } from 'gatsby';

export interface SiteMetadata {
  /** The name of the website. */
  title: string;
  /** Text to be shown in the landing page heading. */
  tag: string;
  /** The description of the website. */
  description: string;
  /** The url of the website. */
  siteUrl: string;
  /** The url of the app. */
  appUrl: string;
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
    /** Google application form link. */
    applicationForm: string;
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
        tag
        description
        siteUrl
        appUrl
        social {
          facebook
          instagram
          twitter
          linkedin
          reddit
          github
          applicationForm
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
