import * as React from 'react';
import styled from 'styled-components';
import { Button } from '@components/shared/buttons';

interface OwnProps {
  onClick?: Function;
}

const CancelButtonHtml = styled(Button)`
  background: #e3e3e3;
  color: black;
  float: right;

  @media (hover: hover) {
    &:hover {
      background: #ccc;
    }
  }
  @media screen and (max-width: ${({ theme }) => theme.sizes.width.smallest}) {
    padding: 2px 6px;
  }
`;

export const CancelButton: React.FC<OwnProps> = ({ onClick }) => {
  return (
    <CancelButtonHtml onClick={(e) => onClick && onClick(e)} active={true}>
      Cancel
    </CancelButtonHtml>
  );
};
