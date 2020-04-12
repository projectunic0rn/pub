import styled from 'styled-components';

export const ContainerSidePanel = styled.div`
  flex: 1;
  border-right: 1px solid lightgray;
  padding-top: 2em;
`;

export const Summary = styled.div`
  color: black;
  text-align: center;
  width: 100%;
  margin: 0 auto;
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
