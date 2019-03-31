import * as React from 'react';
import Img, { GatsbyImageProps } from 'gatsby-image';

import styled from '@styled-components';

interface OwnProps {
  small?: boolean;
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

const Avatar: React.FC<AvatarProps> = ({
  alignment = 'horizontal',
  ...avatarProps
}) => <Image alignment={alignment} {...avatarProps} />;

export default Avatar;
