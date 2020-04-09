import styled from 'styled-components';

import { greyLighter, red, redLight, white } from '@styles/constants';

type FormInputProps = {
  hasError?: boolean;
};

export const FormInput = styled.input<FormInputProps>`
  max-width: 400px;
  padding: 0.425em;
  border-radius: 0;
  box-shadow: none;
  border-radius: 3px;
  box-shadow: 0 0 1px ${greyLighter};
  border: ${(props) =>
    props.hasError ? `1px solid ${red}` : `1px solid ${greyLighter};`};
  background: ${(props) => (props.hasError ? redLight : white)};

  :focus {
    border-color: ${(props) =>
      props.hasError ? red : props.theme.colors.base};
  }
`;
