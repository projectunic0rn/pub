import { graphql, useStaticQuery } from 'gatsby';
import { FluidObject } from 'gatsby-image';

interface DefaultImage {
  file: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
}

const defaultPostImageQuery = graphql`
  query {
    file(relativePath: { eq: "default-post-image.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

export const useDefaultPostImage = () => {
  const { file }: DefaultImage = useStaticQuery(defaultPostImageQuery);

  return file;
};
