import { graphql, useStaticQuery } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';
import * as React from 'react';

interface Data {
  placeholderImage: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
}

const placeholderImageQuery = graphql`
  query {
    placeholderImage: file(relativePath: { eq: "unicorn-icon.png" }) {
      childImageSharp {
        fluid(maxWidth: 1800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

/** Displays a properly-sized placeholder image. */
const PlaceholderImage: React.FC = () => {
  const { placeholderImage }: Data = useStaticQuery(placeholderImageQuery);

  return <Img fluid={placeholderImage.childImageSharp.fluid} />;
};

export default PlaceholderImage;
