import * as React from 'react';
import styled from '@styled-components';

const Button = styled.button`
  background-color: #5f8ddc;
  border: none;
  cursor: pointer;
  color: white;
  padding: 10px 1em;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border-radius: 4px;
  font-size: 16px;
`;

const NavButton: React.FC = ({ children }) => {
  return <Button>{children}</Button>;
};

export default NavButton;
