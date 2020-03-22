import React, { FC, useEffect, useState } from 'react';
import { BaseContainer } from './base-container';
import { MainContent } from './main-content';
import { Wrapper } from '../page';
import { FormLabel } from '../form';
import { ContainerSidePanel, Summary, Image } from '../side-panels';
import { ApiResponse, ErrorResponse, ServiceResolver, User } from '@api';
import { Loader } from '@components/shared';
import { Ribbon, CloseButton, ProfileTechPill } from '..';
import { defaultProfileImage } from '@images';
import { Button } from '../buttons';
import { Link } from 'gatsby';
import { UserAuthHelper } from '@helpers';

interface ProfileContainerProps {
  id?: string;
  path: string;
}

export const ProfileContainer: FC<ProfileContainerProps> = ({ id }) => {
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const api = ServiceResolver.apiResolver();

    const fetchContent = async () => {
      try {
        const response = (await api.getUser(id || '')) as ApiResponse<
          User | ErrorResponse
        >;

        if (response.ok) {
          const user = response.data as User;
          setUser(user);
        } else {
          setError((response.data as ErrorResponse).message);
        }
      } catch {
        setError('Failed to get user information');
      }

      setIsLoading(false);
    };

    fetchContent();
  }, [id]);

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
        <BaseContainer>
          <ContainerSidePanel style={{ padding: '20px ' }}>
            <Summary>
              <Image
                src={user.profilePictureUrl || defaultProfileImage}
                alt="Profile Picture"
              />
              <Summary>{user.username}</Summary>
            </Summary>
            {UserAuthHelper.isUserAuthenticated() && (
              <React.Fragment>
                <br />
                <Link to="/settings">
                  <Button>Edit Profile</Button>
                </Link>
              </React.Fragment>
            )}
          </ContainerSidePanel>
          <MainContent>
            {user.bio && (
              <React.Fragment>
                <FormLabel>Bio</FormLabel>
                <br />
                <p>{user.bio}</p>
              </React.Fragment>
            )}

            {user.technologies && (
              <React.Fragment>
                <FormLabel>Technologies</FormLabel>
                <br />
                {user.technologies.map((t) => (
                  <ProfileTechPill data-testid="technology" key={t.name}>
                    {t.name}
                  </ProfileTechPill>
                ))}
              </React.Fragment>
            )}
          </MainContent>
        </BaseContainer>
      )}
    </Wrapper>
  );
};
