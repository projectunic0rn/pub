import * as React from 'react';

import { Anchor } from '@components';
import { useSiteMetadata } from '@hooks';
import styled from '@styled-components';

type ButtonVariant = 'default' | 'secondary';

interface OwnProps {
  /** The text to display inside the button. */
  content?: string;
  /** Determines the style of the button. */
  variant?: ButtonVariant;
}

type CtaButtonProps = OwnProps;

interface ButtonProps {
  variant: ButtonVariant;
}

const Button = styled(Anchor)<ButtonProps>`
  font-weight: 700;
  padding: 15px 45px;
  border: ${({ variant }) => {
    switch (variant) {
      case 'secondary':
        return '3px solid #fff';
      case 'default':
      default:
        return '1px solid #5f8ddc';
    }
  }};
  border-radius: 5px;
  background: ${({ variant, theme }) => {
    switch (variant) {
      case 'secondary':
        return 'transparent';
      case 'default':
      default:
        return theme.colors.highlight;
    }
  }};

  @media screen and (max-width: 41.6875em) {
    display: block;
    width: 90%;
    margin: 0 auto;
  }

  && {
    color: #fff;
  }
`;

const CtaButton: React.FC<CtaButtonProps> = ({
  content = 'Join Slack',
  variant = 'default',
}) => {
  const siteMetadata = useSiteMetadata();

  return (
    <Button
      href={`${siteMetadata.social.slackInvite}`}
      content={content}
      title={`${siteMetadata.title} Slack invite link`}
      variant={variant}
    />
  );
};

export default CtaButton;
