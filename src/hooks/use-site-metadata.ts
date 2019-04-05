import { graphql, useStaticQuery } from 'gatsby';

export interface SiteMetadata {
  /** The name of the website. */
  title: string;
  /** The description of the website. */
  description: string;
  /** The url of the website. */
  url: string;
  /** Contains the project's social handles. */
  social: {
    /** The websites Twitter handle. */
    twitter: string;
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
        description
        url
        social {
          twitter
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
