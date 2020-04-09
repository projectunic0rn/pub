import { Link } from 'gatsby';
import React, { FC, Fragment, useEffect, useState } from 'react';

import { BaseContainer } from './base-container';
import { MainContent } from './main-content';
import { Button } from '../buttons';
import { FormLabel } from '../form';
import { Wrapper } from '../page';
import { ProfileTechPill } from '../pills';
import { Ribbon, CloseButton } from '../ribbons';
import { ContainerSidePanel, Summary, Image } from '../side-panels';
import { ApiResponse, ErrorResponse, ServiceResolver, User } from '@api';
import { Loader } from '@components/shared';
import { UserAuthHelper } from '@helpers';
import { defaultProfileImage } from '@images';

type ProfileContainerProps = {
  id?: string;
  path: string;
};

export const ProfileContainer: FC<ProfileContainerProps> = ({ id }) => {
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
              <Fragment>
                <br />
                <Link to="/settings">
                  <Button>Edit Profile</Button>
                </Link>
              </Fragment>
            )}
          </ContainerSidePanel>
          <MainContent>
            {user.bio && (
              <Fragment>
                <FormLabel>Bio</FormLabel>
                <br />
                <p>{user.bio}</p>
              </Fragment>
            )}

            {user.technologies && (
              <Fragment>
                <FormLabel>Technologies</FormLabel>
                <br />
                {user.technologies.map((t) => (
                  <ProfileTechPill data-testid="technology" key={t.name}>
                    {t.name}
                  </ProfileTechPill>
                ))}
              </Fragment>
            )}
          </MainContent>
        </BaseContainer>
      )}
    </Wrapper>
  );
};
