import styled from 'styled-components';

export const Loader = styled.span`
  border: 6px solid ${({ theme }) => theme.colors.highlightDark};
  border-radius: 100%;
  border-top: 6px solid ${({ theme }) => theme.colors.highlight};
  width: 48px;
  height: 48px;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);

  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
