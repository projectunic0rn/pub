import * as React from 'react';
import styled from '@styled-components';

interface ButtonProps {
  background?: string;
  backgroundHover?: string;
  onClick: Function;
  style: any;
}

const Button: React.FC<ButtonProps> = ({
  background,
  backgroundHover,
  onClick,
  children,
  style,
}) => {
  const GeneralButton = styled.button`
    background: ${background};
    color: white;
    border-radius: 0.2em;
    padding: 3px 25px;
    border: none;
    transition: 0.15s;

    :hover {
      background: ${backgroundHover};
      cursor: pointer;
    }

    :focus {
      border: none;
      outline: none;
    }
  `;

  return (
    <GeneralButton onClick={() => onClick()} style={style}>
      {children}
    </GeneralButton>
  );
};

export default Button;
