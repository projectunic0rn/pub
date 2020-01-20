import { Link, navigate } from 'gatsby';
import React, { ChangeEvent, FC, useState } from 'react';
import styled from 'styled-components';

import { ApiButton } from '../buttons/api-button';
import {
  ApiResponse,
  ErrorResponse,
  ServiceResolver,
  UserValidation,
  Username,
  JwtToken,
} from '@api';
import {
  FormLabel,
  FormInput,
  LinkWrapper,
  ButtonWrapper,
} from '@components/shared/form';
import { Form } from '@components/shared/form';
import { SessionStorageHelper } from '@helpers';
import { FormVal } from '@utils';

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

const Error = styled.ul`
  color: ${({ theme }) => theme.colors.alert.danger};
  margin: 0;
  li {
    margin: 0;
  }
`;

const UsernameCheck = styled.small<{ isValid: boolean }>`
  color: ${(props) => (props.isValid ? '' : 'red')};
`;

interface InputValue {
  val: string;
  required: boolean;
}

interface FormInput {
  [key: string]: InputValue;
}

export const SignUpForm: FC = () => {
  const validation = new FormVal();

  const [formInputs, setFormInputs] = useState<FormInput>({
    email: { val: '', required: true },
    username: { val: '', required: true },
    password: { val: '', required: true },
    confirmPassword: { val: '', required: true },
  });

  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [message, setMessage] = useState<string | UserValidation>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [usernameAvailablity, setUsernameAvailability] = useState<
    UserValidation
  >({ valid: false, reason: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const state = formInputs;
    state[name].val = value;

    setFormInputs({ ...state });
  };

  const handleClick = async () => {
    const auth = ServiceResolver.authResolver();
    const errors = validation.userSignUp(formInputs);

    if (errors.length) return setFormErrors([...errors]);
    setFormErrors([]);

    try {
      const locale =
        typeof window.navigator !== 'undefined'
          ? window.navigator.language
          : 'en-US';
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const response = (await auth.signUp({
        username: formInputs.username.val,
        email: formInputs.email.val,
        password: formInputs.password.val,
        passwordConfirmation: formInputs.confirmPassword.val,
        locale,
        timezone,
      })) as ApiResponse<JwtToken | ErrorResponse>;

      if (response.ok) {
        SessionStorageHelper.storeJwt(response.data as JwtToken);
        navigate('/app/projects/');
      } else {
        setMessage((response.data as ErrorResponse).message);
      }
    } catch (err) {
      setMessage('Failed to sign up. Please try again');
    }
  };

  const displayErrorMessages = () => {
    return formErrors.map((err: string) => {
      if (err === 'email') return <li key={err}>Invalid email</li>;
      if (err === 'username') return <li key={err}>Invalid username</li>;
      if (err === 'password')
        return (
          <li key={err}>
            Password must contain:
            <ul>
              <li>six characters or more</li>
              <li>
                has at least one lowercase and one uppercase alphabetical
                character
              </li>
              <li>or has at least one lowercase and one numeric character</li>
              <li>or has at least one uppercase and one numeric character</li>
            </ul>
          </li>
        );
      if (err === 'confirmPassword')
        return <li key={err}>Passwords do not match</li>;
    });
  };

  const checkUsername = async (e: ChangeEvent<HTMLInputElement>) => {
    const api = ServiceResolver.apiResolver();
    const { name, value } = e.target;
    const state = formInputs;
    state[name].val = value;

    if (value) {
      setIsLoading(true);
      const username: Username = {
        username: value,
      };
      try {
        const response = (await api.validateUsername(username)) as ApiResponse<
          UserValidation | ErrorResponse
        >;

        if (!response.ok) setMessage(response.data as UserValidation);

        setIsLoading(false);
        setUsernameAvailability(response.data as UserValidation);
        setFormInputs({ ...state });
      } catch (error) {
        setMessage('Failed to validate username');
      }
    } else {
      setUsernameAvailability({ valid: false, reason: '' });
    }
  };

  return (
    <Wrapper>
      <Form heading={`Sign Up`}>
        {formErrors && <Error>{displayErrorMessages()}</Error>}
        {message && <Error>{message}</Error>}
        <FormLabel htmlFor="email">Email</FormLabel>
        <FormInput
          name="email"
          type="email"
          placeholder="unicorn@projectunicorn.net"
          onChange={(e) => handleChange(e)}
          hasError={formErrors.includes('email')}
        />

        <FormLabel htmlFor="username">Username</FormLabel>
        <FormInput
          name="username"
          type="text"
          placeholder="unicorn21"
          onChange={(e) => checkUsername(e)}
          hasError={formErrors.includes('username')}
        />
        <UsernameCheck isValid={usernameAvailablity.valid}>
          {isLoading ? 'checking...' : usernameAvailablity.reason}
        </UsernameCheck>
        <FormLabel htmlFor="password">Password</FormLabel>
        <FormInput
          name="password"
          type="password"
          placeholder="Your Password"
          onChange={(e) => handleChange(e)}
          hasError={
            formErrors.includes('password') ||
            formErrors.includes('confirmPassword')
          }
        />

        <FormLabel htmlFor="password">Confirm Password</FormLabel>
        <FormInput
          name="confirmPassword"
          type="password"
          placeholder="Confirm Your Password"
          onChange={(e) => handleChange(e)}
          hasError={
            formErrors.includes('password') ||
            formErrors.includes('confirmPassword')
          }
        />

        <LinkWrapper>
          <Link to="/signin">Already a member? Sign In</Link>
        </LinkWrapper>

        <ButtonWrapper>
          <ApiButton handleClick={handleClick} statusText="Signing Up...">
            Sign Up
          </ApiButton>
        </ButtonWrapper>
      </Form>
    </Wrapper>
  );
};
