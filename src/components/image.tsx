import { graphql, StaticQuery } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';
import * as React from 'react';

interface Data {
  placeholderImage: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
}

function renderImg(data: Data) {
  return <Img fluid={data.placeholderImage.childImageSharp.fluid} />;
}

const imageQuery = graphql`
  query {
    placeholderImage: file(relativePath: { eq: "unicorn-icon.png" }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

const Image: React.FunctionComponent = () => (
  <StaticQuery query={imageQuery} render={renderImg} />
);

export default Image;
