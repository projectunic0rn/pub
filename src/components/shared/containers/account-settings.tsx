import React, {
  ChangeEvent,
  FC,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { debounce } from 'lodash';
import { MainContent } from './main-content';
import { SettingsContainer } from './settings-container';
import { ApiButton } from '../buttons';
import { Form } from '../form';
import {
  FormLabel,
  FormInput,
  FormTextArea,
  ButtonWrapper,
  TechnologiesSelect,
} from '../form/controls';
import { MenuItem } from '../side-panels/container-side-panel';
import { ContainerSidePanel, Image } from '../side-panels';
import {
  ApiResponse,
  ErrorResponse,
  ServiceResolver,
  User,
  Username,
  UserTechnology,
  UserValidation,
} from '@api';
import { UserAuthHelper } from '@helpers';
import { defaultProfileImage } from '@images';
import { ValueType } from 'react-select/src/types';
import styled from 'styled-components';

interface OptionType {
  label: string;
  value: string;
}

const UsernameCheck = styled.small<{ isValid: boolean }>`
  color: ${(props) => (props.isValid ? '' : 'red')};
`;

export const AccountSettings: FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>();
  const [isLoading, setIsLoading] = useState(true);

  const [user, setUser] = useState<User>();
  const [username, setUsername] = useState('');
  const [usernameAvailablity, setUsernameAvailability] = useState<
    UserValidation
  >({ valid: true, reason: '' });
  const [bio, setBio] = useState('');
  const [technologies, setTechnologies] = useState<UserTechnology[]>([]);

  // TODO: Read authentication state via Auth Context
  useEffect(() => {
    const api = ServiceResolver.apiResolver();

    const fetchContent = async () => {
      try {
        const userId = UserAuthHelper.getUserId();
        const response = (await api.getUser(userId)) as ApiResponse<
          User | ErrorResponse
        >;

        if (response.ok) {
          const user = response.data as User;
          setUser(user);
          setUsername(user.username);
          setBio(user.bio);
          setTechnologies(user.technologies ?? []);
        } else {
          setError((response.data as ErrorResponse).message);
        }
      } catch {
        setError('Failed to get user information');
      }

      setIsLoading(false);
    };

    fetchContent();
  }, []);

  const handleClick = async () => {
    const api = ServiceResolver.apiResolver();

    try {
      const updatedUser: User = {
        ...user,
        username,
        bio,
        technologies,
      };
      const response = (await api.editUser(updatedUser)) as ApiResponse<
        User | ErrorResponse
      >;

      if (response.ok) {
        setSuccess('Settings saved');
      } else {
        setError((response.data as ErrorResponse).message);
      }
    } catch (err) {
      setError('Failed to save settings. Please try again');
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
        UserValidation | ErrorResponse
      >;
      if (response.ok) {
        setUsernameAvailability(response.data as UserValidation);
      }
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
    <SettingsContainer
      error={error}
      setError={setError}
      success={success}
      setSuccess={setSuccess}
      isLoading={isLoading}
    >
      <ContainerSidePanel>
        <MenuItem>General</MenuItem>
      </ContainerSidePanel>
      <MainContent>
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

          <FormLabel htmlFor="bio">Bio</FormLabel>

          <FormTextArea
            name="bio"
            id="bio"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setBio(e.target.value)
            }
            value={bio}
            rows={5}
          >
            {bio}
          </FormTextArea>
          <br />

          <FormLabel htmlFor="technologies">Technologies</FormLabel>
          {user && user.technologies && (
            <TechnologiesSelect
              name="technologies"
              id="technologies"
              setError={setError}
              initialValues={technologies}
              setTechnologies={handleSelectChange}
            />
          )}

          <ButtonWrapper>
            <ApiButton handleClick={handleClick} statusText="Saving">
              Save
            </ApiButton>
          </ButtonWrapper>
        </Form>
      </MainContent>
    </SettingsContainer>
  );
};
