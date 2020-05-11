import { Link, navigate } from 'gatsby';
import React, { ChangeEvent, FocusEvent, FC, useState, FormEvent } from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import * as yup from 'yup';

import {
  ApiResponse,
  ErrorResponse,
  ServiceResolver,
  UserValidation,
  Username,
  JwtToken,
} from '@api';
import { FormInput, LinkWrapper, ButtonWrapper } from '@components/shared/form';
import { Form } from '@components/shared/form';
import { Button } from '@components/shared/buttons';
import { SessionStorageHelper } from '@helpers';
import { messages } from '../../../const';
import { hasError, customHandleBlur } from '@utils/form-validation';
import Message from '../message';

const Wrapper = styled.section`
  background-color: ${({ theme }) => theme.colors.section};
  padding: ${({ theme }) => theme.boxes.padding.section.smallTop};
  @media screen and(max-width: ${({ theme }) => theme.sizes.width.medium}) {
    flex-direction: column;
  }
  @media screen and(max-width: ${({ theme }) => theme.sizes.width.small}) {
    padding: ${({ theme }) => theme.boxes.padding.section.small};
  }
`;

const UsernameCheck = styled.small<{ isValid: boolean }>`
  color: ${(props) => (props.isValid ? 'green' : 'red')};
`;

interface InputValue {
  val: string;
  required: boolean;
}

interface FormInput {
  [key: string]: InputValue;
}

interface FormValues {
  email: string;
  username: string;
  password: string;
  passwordConfirmation: string;
}

export const SignUpForm: FC = () => {
  const [message, setMessage] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [usernameAvailablity, setUsernameAvailability] = useState<
    UserValidation
  >({ valid: false, reason: '' });

  let focusedElements: Array<string> = [];

  const initialValues: FormValues = {
    email: '',
    username: '',
    password: '',
    passwordConfirmation: '',
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required(messages.validation.required)
      .email(messages.validation.email),
    username: yup.string().required(messages.validation.required),
    password: yup.string().required(messages.validation.required),
    passwordConfirmation: yup.string().required(messages.validation.required),
  });

  const makeApiCall = async (values: FormValues, setSubmitting: Function) => {
    const { username, email, password, passwordConfirmation } = values;

    if (passwordConfirmation !== password) {
      setMessage('Passwords do not match');

      return;
    }

    setSubmitting(true);

    const auth = ServiceResolver.authResolver();

    setTimeout(async () => {
      try {
        const locale =
          typeof window.navigator !== 'undefined'
            ? window.navigator.language
            : 'en-US';
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const response = (await auth.signUp({
          username,
          email,
          password,
          passwordConfirmation,
          locale,
          timezone,
        })) as ApiResponse<JwtToken | ErrorResponse>;

        if (response.ok) {
          SessionStorageHelper.storeJwt(response.data as JwtToken);
          navigate('/projects/');
        } else {
          setMessage((response.data as ErrorResponse).message);
        }
      } catch (err) {
        setMessage('Failed to sign up. Please try again');
      }

      setSubmitting(false);
    }, 1);
  };

  const checkUsername = async (e: ChangeEvent<HTMLInputElement>) => {
    const api = ServiceResolver.apiResolver();

    setIsLoading(true);

    setTimeout(async () => {
      const username: Username = {
        username: e.target.value,
      };

      try {
        const response = (await api.validateUsername(username)) as ApiResponse<
          UserValidation | ErrorResponse
        >;

        if (!response.ok) setMessage((response.data as UserValidation).reason);

        setUsernameAvailability(response.data as UserValidation);
      } catch {
        setMessage('Failed to validate username');
      }

      setIsLoading(false);
    }, 500);
  };

  return (
    <Wrapper>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) =>
          makeApiCall(values, setSubmitting)
        }
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          values,
          errors,
        }) => (
          <Form
            heading={`Sign Up`}
            onSubmit={(e: FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            {message && <Message variant="error" value={message.toString()} />}

            <FormInput
              label="Email"
              name="email"
              id="email"
              type="email"
              placeholder="unicorn@projectunicorn.net"
              onBlur={(e: FocusEvent<HTMLInputElement>) =>
                customHandleBlur(e, focusedElements, handleBlur)
              }
              hasError={hasError(errors, focusedElements, 'email')}
            />
            <FormInput
              label="Username"
              name="username"
              id="username"
              type="text"
              placeholder="unicorn21"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                checkUsername(e);
                handleChange(e);
              }}
              hasError={hasError(errors, focusedElements, 'username')}
            />
            <UsernameCheck isValid={usernameAvailablity.valid}>
              {values.username &&
                (isLoading
                  ? 'Checking username...'
                  : usernameAvailablity.reason)}
            </UsernameCheck>
            <FormInput
              label="Password"
              name="password"
              id="password"
              type="password"
              placeholder="Your Password"
              onBlur={(e: FocusEvent<HTMLInputElement>) =>
                customHandleBlur(e, focusedElements, handleBlur)
              }
              hasError={hasError(errors, focusedElements, 'password')}
            />
            <FormInput
              label="Confirm Password"
              name="passwordConfirmation"
              id="passwordConfirmation"
              type="password"
              placeholder="Confirm Your Password"
              onBlur={(e: FocusEvent<HTMLInputElement>) =>
                customHandleBlur(e, focusedElements, handleBlur)
              }
              hasError={hasError(
                errors,
                focusedElements,
                'passwordConfirmation',
              )}
            />

            <LinkWrapper>
              <Link to="/signin">Already a member? Sign In</Link>
            </LinkWrapper>

            <ButtonWrapper>
              <Button
                type="submit"
                disabled={isSubmitting}
                onClick={() =>
                  (focusedElements =
                    Object.keys(errors).length > 0
                      ? [...Object.keys(errors)]
                      : [...Object.keys(values)])
                }
              >
                {isSubmitting ? 'Signing Up...' : 'Sign Up'}
              </Button>
            </ButtonWrapper>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
