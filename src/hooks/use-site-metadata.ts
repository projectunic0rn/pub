import { graphql, useStaticQuery } from 'gatsby';

export interface SiteMetadata {
  title: string;
  description: string;
  url: string;
  social: {
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
