import React, { FC } from 'react';
import styled from 'styled-components';

import { ErrorMessage } from 'formik';

import { FormLabel } from '@components/shared/form/controls';

const FormErrorMessage = styled(ErrorMessage)`
  color: ${({ theme }) => theme.colors.alert.danger};
`;

const FormHint = styled.small`
  color: ${({ theme }) => theme.colors.greyDark};
`;

interface FormInputWrapperProps {
  name: string;
  hint?: string;
  label?: string;
  hasError?: boolean;
}

export const FormInputWrapper: FC<FormInputWrapperProps> = ({
  name,
  hint,
  label,
  children,
}) => (
  <>
    {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
    {children}
    <FormErrorMessage name={name} component="span" />
    {hint && <FormHint>{hint}</FormHint>}
  </>
);
