import { Link, navigate } from 'gatsby';
import * as React from 'react';

import styled from '@styled-components';
import {
  FormLabel,
  FormInput,
  LinkWrapper,
  ButtonWrapper,
} from '@components/shared/form';
import { Form } from '@components/shared/form';
import { useState } from 'react';
import ServiceResolver from '@/api/service-resolver';
import { ApiResponse, ErrorResponse } from '@/api/types/responses';
import { UserValidation } from '@/api/types/user-validation';
import { Button } from '@components/app/shared';
import { JwtToken } from '@/api/types/jwt-token';
import { SessionStorageHelper, UserAuthHelper } from '@/helpers';
import { MockApiService } from '@/mocks/mock-api-service';
import { MockAuthService } from '@/mocks/mock-auth-service';
import { ApiService } from '@/api/api-service';
import { AuthService } from '@/api/auth-service';
import { FormVal } from '@/utils/form-validation';

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

export const SignUpForm: React.FC = () => {
  const validation = new FormVal();

  const [formInputs, setFormInputs] = useState({
    email: { val: '', required: true },
    username: { val: '', required: true },
    password: { val: '', required: true },
    confirmPassword: { val: '', required: true },
  });

  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [message, setMessage] = useState<string | UserValidation>();
  const [api, setApi] = useState<MockApiService | ApiService>();
  const [auth, setAuth] = useState<MockAuthService | AuthService>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [usernameAvailablity, setUsernameAvailability] = useState<
    UserValidation
  >({ valid: false, reason: '' });

  React.useEffect(() => {
    setAuth(new ServiceResolver().AuthResolver());
    setApi(new ServiceResolver().ApiResolver());
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const state: any = formInputs;
    state[name].val = value;

    setFormInputs({ ...state });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validation.userSignUp(formInputs);

    if (errors.length) return setFormErrors([...errors]);

    try {
      const locale =
        typeof window.navigator !== 'undefined'
          ? window.navigator.language
          : 'en';
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const response = (await (auth as MockAuthService | AuthService).signUp({
        username: formInputs.username.val,
        email: formInputs.email.val,
        password: formInputs.password.val,
        passwordConfirmation: formInputs.confirmPassword.val,
        locale,
        timezone,
      })) as ApiResponse<JwtToken | ErrorResponse>;

      if (response.ok) {
        SessionStorageHelper.storeJwt(response.data as JwtToken);
        navigate('/app/projects');
      } else {
        setMessage((response.data as ErrorResponse).message);
      }
    } catch (err) {
      setMessage('Sign up failed');
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

  const checkUsername = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const state: any = formInputs;
    state[name].val = value;

    if (value) {
      setIsLoading(true);

      try {
        const response = (await (api as
          | MockApiService
          | ApiService).validateUsername(value)) as ApiResponse<
          UserValidation | ErrorResponse
        >;

        if (!response.ok) setMessage(response.data as UserValidation);

        setIsLoading(false);
        setUsernameAvailability(response.data as UserValidation);
        setFormInputs({ ...state });
      } catch (error) {
        setMessage('Failed to validate username');
      }

      // *** TESTING PURPOSES ONLY - WILL BE REMOVED BEFORE DEPLOYMENT ***
      //
      // const response = await fetch(
      //   `https://pub-api-test.azurewebsites.net/api/util/${value}/`,
      //   {
      //     method: 'POST',
      //     mode: 'cors',
      //   }
      // );

      // const data = await response.json();
      // console.log(data);
      // setIsLoading(false);
      // setUsernameAvailability(data.data);
      // setFormInputs({ ...state });
    } else {
      setUsernameAvailability({ valid: false, reason: '' });
    }
  };

  return (
    <Wrapper>
      <Form heading={`Sign Up`} handleSubmit={handleSubmit}>
        {message ||
          (formErrors && (
            <Error>
              {message}
              {displayErrorMessages()}
            </Error>
          ))}
        <FormLabel htmlFor="email">Email</FormLabel>
        <FormInput
          name="email"
          type="email"
          placeholder="unicorn@projectunicorn.net"
          onChange={(e) => handleChange(e)}
        />

        <FormLabel htmlFor="username">Username</FormLabel>
        <FormInput
          name="username"
          type="text"
          placeholder="unicorn21"
          onChange={(e) => checkUsername(e)}
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
        />

        <FormLabel htmlFor="password">Confirm Password</FormLabel>
        <FormInput
          name="confirmPassword"
          type="password"
          placeholder="Confirm Your Password"
          onChange={(e) => handleChange(e)}
        />

        <LinkWrapper>
          <Link to="/signin">Already a memeber? Sign In</Link>
        </LinkWrapper>

        <ButtonWrapper>
          <Button active={false}>Sign Up</Button>
        </ButtonWrapper>
      </Form>
    </Wrapper>
  );
};
