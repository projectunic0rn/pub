import React from 'react';
import styled from 'styled-components';

interface Props {
  value: string;
}

const ErrorMsg = styled.span`
  color: red;
  font-size: 14px;
`;

export const ErrorMessage: React.FC<Props> = ({ value }) => {
  return <ErrorMsg>{value} field required</ErrorMsg>;
};
