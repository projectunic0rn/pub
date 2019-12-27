import React from 'react';
import { BaseContainer } from './base-container';
import { ContainerSidePanel } from '../side-panels';
import { MainContent } from './main-content';
import {
  FormLabel,
  FormInput,
  FormTextArea,
  Form,
  ButtonWrapper,
} from '../form';
import { User } from '@/api/types/user';
import ServiceResolver from '@/api/service-resolver';
import { ApiResponse, ErrorResponse } from '@/api/types/responses';
import { Loader, ProfileTechPill } from '@components/shared';
import { Ribbon, CloseButton } from '..';
import { Wrapper } from '../page';
import { UserAuthHelper } from '@/helpers';
import { MenuItem } from '../side-panels/container-side-panel';
import { ApiButton } from '../buttons';

export const SettingsContainer: React.FC = () => {
  const [user, setUser] = React.useState<User>();
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const [username, setUsername] = React.useState<string>('');
  const [bio, setBio] = React.useState<string>('');

  React.useEffect(() => {
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

  const handleClick = async () => {};

  return (
    <Wrapper>
      {isLoading && <Loader />}
      {error && (
        <Ribbon type="danger">
          {error}{' '}
          <CloseButton onClick={() => setError(null)}>&#10006;</CloseButton>
        </Ribbon>
      )}

      {!isLoading && user && (
        <BaseContainer border={true}>
          <ContainerSidePanel style={{ paddingTop: 32 }}>
            <MenuItem>General</MenuItem>
          </ContainerSidePanel>
          <MainContent>
            <Form>
              <FormLabel html-for="username">Username</FormLabel>
              <FormInput
                type="text"
                name="username"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUsername(e.target.value)
                }
                value={username}
              />
              <br />
              <br />

              <FormLabel>Bio</FormLabel>

              <FormTextArea
                name="bio"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setBio(e.target.value)
                }
                value={bio}
                onBlur={() => {}}
                rows={3}
              >
                {bio}
              </FormTextArea>
              <br />

              <FormLabel>Technologies</FormLabel>
              {user &&
                user.technologies.map((t) => (
                  <ProfileTechPill key={t}>{t}</ProfileTechPill>
                ))}
              <ButtonWrapper>
                <ApiButton handleClick={handleClick} statusText="Saving">
                  Save
                </ApiButton>
              </ButtonWrapper>
            </Form>
          </MainContent>
        </BaseContainer>
      )}
    </Wrapper>
  );
};
