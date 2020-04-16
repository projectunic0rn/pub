import styled from 'styled-components';

export const ContainerSidePanel = styled.div`
  flex: 0.3;
  border: none;
  padding-top: 2em;

  @media screen and (min-width: ${({ theme }) => theme.sizes.width.small}) {
    border-right: 1px solid lightgray;
  }
`;

export const Summary = styled.div`
  color: black;
  text-align: center;
  width: 100%;
  margin: 0 auto 1em;
`;

export const Image = styled.img`
  height: auto;
  border-radius: 100px;
  margin-bottom: 0;
`;

export const Title = styled.b`
  font-size: 16px;
  margin-top: -10px;
`;

export const ButtonContainer = styled.div`
  text-align: center;
  margin-top: 20px;
`;

export const MenuItemContainer = styled.div`
  margin-top: 20px;
`;

export const MenuItem = styled.div`
  color: ${({ theme }) => theme.colors.highlight};
  padding: 5px 15px;
  :hover {
    background: ${({ theme }) => theme.colors.shadow};
    cursor: pointer;
  }
`;
