import * as React from 'react';

import styled from 'styled-components';
import buttonTemplate, { ButtonProps, OwnProps } from './button-template';

type CtaButtonProps = OwnProps & React.AnchorHTMLAttributes<HTMLAnchorElement>;

const Button = styled.button`
  ${buttonTemplate}
`;

const ButtonSubmit = styled.button<ButtonProps>`
  ${buttonTemplate}
`;

const CtaButton: React.FC<CtaButtonProps> = ({
  children,
  content = 'Join Slack',
  variant = 'default',
  type = 'button',
}) => {
  return type === 'button' ? (
    <Button variant={variant}>{children || content}</Button>
  ) : (
    <ButtonSubmit variant={variant} type="submit" value={content} />
  );
};

export default CtaButton;
