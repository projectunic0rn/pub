import React, { FC } from 'react';
import styled from 'styled-components';

export type MessageVariant = 'error' | 'success' | 'default';

interface MessageProps {
  value: string;
  variant?: MessageVariant;
}

interface WrapperProps {
  variant: MessageVariant;
}

const Wrapper = styled.span<WrapperProps>`
  color: ${({ variant, theme }) => {
    switch (variant) {
      case 'error':
        return 'red';
      case 'success':
        return 'green';
      default:
        return theme.colors.base;
    }
  }};
  font-size: 14px;
`;

const Message: FC<MessageProps> = ({ value, variant = 'default' }) => (
  <Wrapper variant={variant}>{value}</Wrapper>
);

export default Message;
