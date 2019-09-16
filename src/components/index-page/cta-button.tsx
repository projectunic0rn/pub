import * as React from 'react';
import { OutboundLink } from 'gatsby-plugin-google-analytics';

import { useSiteMetadata } from '@hooks';
import styled, { css } from '@styled-components';

type CtaButtonVariant = 'default' | 'secondary';

interface OwnProps {
  /** The text to display inside the button. */
  content?: string;
  /** Determines the style of the button. */
  variant?: CtaButtonVariant;
}

type CtaButtonProps = OwnProps & React.AnchorHTMLAttributes<HTMLAnchorElement>;

interface ButtonProps {
  variant: CtaButtonVariant;
}

const Button = styled(OutboundLink)<ButtonProps>`
  border-radius: 0.3125em;
  font-weight: 800;
  padding: 0.9375em 2.8125em;
  transition: 0.15s;

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
    width: 100%;
  }

  @media (hover: hover) {
    &:hover {
      background: ${({ theme }) => theme.colors.highlightDark};
      border-color: transparent;
    }
  }

  && {
    color: ${({ theme }) => theme.colors.baseinvert};
  }
`;

const CtaButton: React.FC<CtaButtonProps> = ({
  children,
  content = 'Join Slack',
  variant = 'default',
  target = '_blank',
  ...anchorProps
}) => {
  const siteMetadata = useSiteMetadata();

  return (
    <Button
      href={`${siteMetadata.social.slackInvite}`}
      title={`${siteMetadata.title} Slack invite link`}
      variant={variant}
      target={target}
      rel="noopener"
      {...anchorProps}
    >
      {children || content}
    </Button>
  );
};

export default CtaButton;
