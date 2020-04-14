import React, { FC, useState } from 'react';
import styled from 'styled-components';

type CardButtonProps = {
  statusText: string;
  joined?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

type ButtonProps = {
  joined: boolean;
};

const Button = styled.button<ButtonProps>`
  color: ${({ joined, theme }) =>
    joined ? theme.colors.text : theme.colors.highlight};
  border-radius: 0.2em;
  padding: 7px 25px;
  transition: 0.15s;
  opacity: ${(props) => (props.disabled ? '0.75' : '1')};
  align-self: flex-end;

  background: transparent;
  border: 1px solid
    ${({ joined, theme }) =>
      joined ? theme.colors.greyDark : theme.colors.highlight};

  @media (hover: hover) {
    &:hover {
      background: ${({ joined, theme }) =>
        joined ? 'transparent' : theme.colors.highlight};
      color: ${({ joined, theme }) =>
        joined ? theme.colors.base : theme.colors.baseinvert};
      border: 1px solid
        ${({ joined, theme }) =>
          joined ? theme.colors.base : theme.colors.highlight};
      cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
    }
  }

  :focus {
    outline: none;
    box-shadow: 0 0 0 4px
      ${({ joined, theme }) =>
        joined ? theme.colors.secondary : theme.colors.highlightLight};
  }
`;

const CardButton: FC<CardButtonProps> = ({
  children,
  joined = false,
  disabled = false,
  statusText,
  onClick,
}) => {
  const [isRequestMade, setIsRequestMade] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (onClick && !isRequestMade) {
      setIsRequestMade(true);
      await onClick();
      setIsRequestMade(false);
    }
  };

  return (
    <Button joined={joined} disabled={disabled} onClick={handleClick}>
      {isRequestMade ? statusText : children}
    </Button>
  );
};

export default CardButton;
