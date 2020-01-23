import { OutboundLink } from 'gatsby-plugin-google-analytics';
import React, { AnchorHTMLAttributes, FC } from 'react';
import styled from 'styled-components';

import ButtonTemplate from './button-template';
import { useSiteMetadata } from '@hooks';

type CtaButtonVariant = 'default' | 'secondary';
type CtaButtonType = 'button' | 'input';

interface OwnProps {
  /** The text to display inside the button. */
  content?: string;
  /** Determines the style of the button. */
  variant?: CtaButtonVariant;
  /** Checks whether the button is a regular butotn or a form input button type. */
  type?: CtaButtonType;
}

type CtaButtonProps = OwnProps & AnchorHTMLAttributes<HTMLAnchorElement>;

interface ButtonProps {
  variant: CtaButtonVariant;
}

const Button = styled(OutboundLink)`
  ${ButtonTemplate}
`;

const ButtonSubmit = styled.input<ButtonProps>`
  ${ButtonTemplate}
`;

const CtaButton: FC<CtaButtonProps> = ({
  children,
  content = 'Join Slack',
  variant = 'default',
  target = '_blank',
  type = 'button',
  ...anchorProps
}) => {
  const siteMetadata = useSiteMetadata();

  return type === 'button' ? (
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
  ) : (
    <ButtonSubmit variant={variant} type="submit" value={content} />
  );
};

export default CtaButton;
