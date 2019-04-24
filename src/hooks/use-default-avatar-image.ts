import { graphql, useStaticQuery } from 'gatsby';
import { FluidObject } from 'gatsby-image';

interface DefaultImage {
  file: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
}

const defaultAvatarImageQuery = graphql`
  query {
    file(relativePath: { eq: "default-avatar-image.png" }) {
      childImageSharp {
        fluid(maxWidth: 1800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

export const useDefaultAvatarImage = () => {
  const { file }: DefaultImage = useStaticQuery(defaultAvatarImageQuery);

  return file;
};
