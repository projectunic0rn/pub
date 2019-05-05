import * as React from 'react';

import { Anchor } from '@components/shared';
import { useSiteMetadata } from '@hooks';
import styled, { css } from '@styled-components';

type CtaButtonVariant = 'default' | 'secondary';

interface OwnProps {
  /** The text to display inside the button. */
  content?: string;
  /** Determines the style of the button. */
  variant?: CtaButtonVariant;
}

type CtaButtonProps = OwnProps;

interface ButtonProps {
  variant: CtaButtonVariant;
}

const Button = styled(Anchor)<ButtonProps>`
  border-radius: 0.3125em;
  font-weight: 700;
  padding: 0.9375em 2.8125em;

  ${({ variant, theme }) => {
    switch (variant) {
      case 'secondary':
        return css`
          background: transparent;
          border: 0.1875rem solid ${theme.colors.baseinvert};
        `;
      case 'default':
      default:
        return css`
          background: ${theme.colors.highlight};
          border: 0.0625rem solid ${theme.colors.highlight};
        `;
    }
  }};

  @media screen and (max-width: ${({ theme }) => theme.sizes.width.small}) {
    display: block;
    margin: 0 auto;
    width: 90%;
  }

  && {
    color: ${({ theme }) => theme.colors.baseinvert};
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
