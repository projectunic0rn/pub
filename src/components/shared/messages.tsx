import React from 'react';
import styled from 'styled-components';

interface MessageProps {
  value: string;
}

const ErrorMsg = styled.span`
  color: red;
  font-size: 14px;
`;

const SuccessMsg = styled.span`
  color: green;
  font-size: 14px;
`;

export const ErrorMessage: React.FC<MessageProps> = ({ value }) => {
  return <ErrorMsg>{value}</ErrorMsg>;
};

export const SuccessMessage: React.FC<MessageProps> = ({ value }) => {
  return <SuccessMsg>{value}</SuccessMsg>;
};
