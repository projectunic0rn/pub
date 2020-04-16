import styled from 'styled-components';

type BaseContainerProps = {
  hasBorder?: boolean;
};

export const BaseContainer = styled.div<BaseContainerProps>`
  display: flex;
  flex-direction: column;
  margin: 0 auto;

  @media screen and (min-width: ${({ theme }) => theme.sizes.width.small}) {
    border: ${({ hasBorder }) => (hasBorder ? '1px solid lightgray' : 'none')};
    flex-direction: row;
  }
`;
