import { graphql, useStaticQuery } from 'gatsby';

export interface SiteMetadata {
  title: string;
  description: string;
  url: string;
  twitter: string;
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
        twitter
      }
    }
  }
`;

/** Custom hook that returns the site metadata. */
export const useSiteMetadata = () => {
  const { site }: Data = useStaticQuery(siteMetadataQuery);

  return site.siteMetadata;
};
