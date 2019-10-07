import React from 'react';
import styled from '@styled-components';
import { theme } from '@styles/theme';

interface Props {
  value: string;
}

const Tech = styled.span`
  background: ${theme.colors.highlight};
  color: white;
  padding: 5px;
`;

const TechInput: React.FC<Props> = ({ value }) => {
  return <Tech>{value}</Tech>;
};

export default TechInput;
