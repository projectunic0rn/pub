import { debounce } from 'lodash';
import React, { FC, useState, useCallback, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { ValueType } from 'react-select/src/types';

import {
  ServiceResolver,
  User,
  UserTechnology,
  UserValidation,
  ApiResponse,
  Username,
} from '@api';
import { ContentProps } from './menu-items';
import {
  Form,
  FormLabel,
  FormInput,
  FormTextArea,
  ButtonWrapper,
  TechnologiesSelect,
} from '@components/shared/form';
import { ApiButton } from '@components/shared/buttons';
import { Image } from '@components/shared/side-panels';
import { defaultProfileImage } from '@images';
import { AuthContext } from '@contexts';

interface OptionType {
  label: string;
  value: string;
}

const UsernameCheck = styled.small<{ isValid: boolean }>`
  color: ${(props) => (props.isValid ? '' : 'red')};
`;

export const ProfileContent: FC<ContentProps> = (props) => {
  const authContext = useContext(AuthContext);

  const [user, setUser] = useState(authContext.member);
  const [username, setUsername] = useState(authContext.member.username);
  const [usernameAvailablity, setUsernameAvailability] = useState<
    UserValidation
  >({ valid: true, reason: '' });
  const [bio, setBio] = useState(authContext.member.bio);
  const [technologies, setTechnologies] = useState(
    authContext.member.technologies,
  );

  useEffect(() => {
    setUser(authContext.member);
    setUsername(authContext.member.username);
    setBio(authContext.member.bio);
    setTechnologies(authContext.member.technologies);
  }, [authContext.member]);

  const handleClick = async () => {
    const api = ServiceResolver.apiResolver();

    try {
      const updatedUser: User = {
        ...user,
        username,
        bio,
        technologies,
      };
      const response = (await api.editUser(updatedUser)) as ApiResponse<User>;
      if (props.handleStatusDisplay) {
        props.handleStatusDisplay('success', 'Settings saved');
      }
      setUser(response.data as User);
      if (authContext.setMember) {
        authContext.setMember(updatedUser);
      }
    } catch (err) {
      if (props.handleStatusDisplay) {
        props.handleStatusDisplay('error', err.message);
      }
    }
  };

  const handleTechnologiesError = (message: string) => {
    if (props.handleStatusDisplay) {
      props.handleStatusDisplay('error', message);
    }
  };

  const handleUsernamValidation = async (
    username: string,
    currentUser: User | undefined,
  ) => {
    const api = ServiceResolver.apiResolver();
    const u: Username = {
      username,
    };

    if (username == currentUser?.username) {
      setUsernameAvailability({ valid: true, reason: '' });
      return;
    }

    try {
      const response = (await api.validateUsername(u)) as ApiResponse<
        UserValidation
      >;
      setUsernameAvailability(response.data as UserValidation);
    } catch {
      setUsernameAvailability({
        valid: false,
        reason: 'Failed to validate username',
      });
    }
  };

  const debouncedUsernameValidation = useCallback(
    debounce(handleUsernamValidation, 450),
    [],
  );

  const handleUsernameChange = (username: string) => {
    setUsername(username);
    setUsernameAvailability({ valid: true, reason: 'checking...' });
    debouncedUsernameValidation(username, user);
  };

  const handleSelectChange = (e: ValueType<OptionType>) => {
    const userId = user?.id === undefined ? '' : user.id;
    const updatedTechnologies: UserTechnology[] = Array.isArray(e)
      ? e.map((v) => {
          const userTech = technologies.find((t) => t.name == v);
          if (userTech == undefined) {
            return { name: v, userId };
          } else {
            return { name: v, userId, id: userTech.id };
          }
        })
      : [];

    setTechnologies(updatedTechnologies);
  };

  return (
    <Form>
      <Image
        src={(user && user.profilePictureUrl) || defaultProfileImage}
        width="64"
        height="64"
      />
      <FormLabel htmlFor="username">Username</FormLabel>
      <FormInput
        type="text"
        name="username"
        id="username"
        value={username}
        onChange={(e) => handleUsernameChange(e.target.value)}
        hasError={!usernameAvailablity.valid}
      />
      {usernameAvailablity.reason != '' && username != user?.username && (
        <UsernameCheck isValid={usernameAvailablity.valid}>
          {usernameAvailablity.reason}
        </UsernameCheck>
      )}
      <br />
      <br />

      <FormLabel htmlFor="bio">About</FormLabel>

      <FormTextArea
        name="bio"
        id="bio"
        onChange={(e) => setBio(e.target.value)}
        value={bio}
        rows={5}
      >
        {bio}
      </FormTextArea>
      <br />

      <FormLabel htmlFor="technologies">Technologies</FormLabel>
      {/* TODO technologies are not being rendered on refresh */}
      <TechnologiesSelect
        name="technologies"
        id="technologies"
        setError={handleTechnologiesError}
        initialValues={technologies}
        setTechnologies={handleSelectChange}
      />

      <ButtonWrapper>
        <ApiButton handleClick={handleClick} statusText="Saving">
          Save
        </ApiButton>
      </ButtonWrapper>
    </Form>
  );
};
