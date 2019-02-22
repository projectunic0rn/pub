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

const imageQuery = graphql`
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

const Image: React.FunctionComponent = () => {
  const { placeholderImage }: Data = useStaticQuery(imageQuery);

  return <Img fluid={placeholderImage.childImageSharp.fluid} />;
};

export default Image;
