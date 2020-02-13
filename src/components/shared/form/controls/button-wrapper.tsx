import styled from 'styled-components';

export const ButtonWrapper = styled.div`
  padding: 1.825em 0.125em;

  @media screen and (max-width: ${({ theme }) => theme.sizes.width.small}) {
    text-align: center;
  }
`;
