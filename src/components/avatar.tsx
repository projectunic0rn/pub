import * as React from 'react';
import Img, { GatsbyImageProps } from 'gatsby-image';

import styled from '@styled-components';

interface OwnProps {
  /**
   * @deprected If `true`, the avatar size will be smaller than the default
   * size.
   */
  small?: boolean;
  /** This value determines if margins will applied to the image. */
  alignment?: 'horizontal' | 'vertical';
}

type AvatarProps = OwnProps & GatsbyImageProps;

const Image = styled(Img).attrs({ small: false })<AvatarProps>`
  min-height: 4em;
  max-height: 4em;
  min-width: 4em;
  max-width: 4em;
  border-radius: 50%;
  margin-right: ${({ alignment }) =>
    alignment === 'horizontal' ? '1.6em' : 0};
`;

/** Displays an avatar image. */
const Avatar: React.FC<AvatarProps> = ({
  alignment = 'horizontal',
  ...avatarProps
}) => <Image alignment={alignment} {...avatarProps} />;

export default Avatar;
