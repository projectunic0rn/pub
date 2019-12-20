import styled from 'styled-components';

export const Wrapper = styled.section`
  padding: ${({ theme }) => theme.boxes.padding.section.smallTop};
  width: 100%;
  min-height: 50vh;

  @media screen and (max-width: ${({ theme }) => theme.sizes.width.small}) {
    padding: ${({ theme }) => theme.boxes.padding.section.small};
  }
`;
