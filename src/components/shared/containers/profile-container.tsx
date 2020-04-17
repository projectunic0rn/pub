import { Link } from 'gatsby';
import React, { FC, Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';

import { BaseContainer } from './base-container';
import { MainContent } from './main-content';
import { FormLabel } from '../form';
import { ProfileTechPill } from '../pills';
import { Ribbon, CloseButton } from '../ribbons';
import { ContainerSidePanel, Summary } from '../side-panels';
import { ApiResponse, ErrorResponse, ServiceResolver, User } from '@api';
import { Loader } from '@components/shared';
import { UserAuthHelper } from '@helpers';
import { defaultProfileImage } from '@images';
import ButtonTemplate from '@components/index-page/button-template';
import { Button } from '../buttons';

type ProfileContainerProps = {
  id?: string;
  path: string;
};

const Image = styled.img`
  border-radius: 50%;
  max-width: 40%;
  margin-bottom: 0;
`;

const Wrapper = styled.div`
  margin: 0 auto;
  padding: 0;
  min-height: 50vh;

  @media screen and (min-width: ${({ theme }) => theme.sizes.width.small}) {
    padding: ${({ theme }) => theme.boxes.padding.section.smallTop};
  }
`;

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
          <ContainerSidePanel>
            <Summary>
              <Image
                src={user.profilePictureUrl || defaultProfileImage}
                alt="Profile Picture"
              />
              <Summary>{user.username}</Summary>
              {UserAuthHelper.isUserAuthenticated() && (
                <Link to="/settings">
                  <Button>Edit Profile</Button>
                </Link>
              )}
            </Summary>
          </ContainerSidePanel>
          <MainContent>
            {user.bio && (
              <Fragment>
                <FormLabel>Bio</FormLabel>
                <p>{user.bio}</p>
              </Fragment>
            )}

            {user.technologies && (
              <Fragment>
                <FormLabel>Technologies</FormLabel>
                <div style={{ marginTop: '0.4em' }}>
                  {user.technologies.map((t) => (
                    <ProfileTechPill data-testid="technology" key={t.name}>
                      {t.name}
                    </ProfileTechPill>
                  ))}
                </div>
              </Fragment>
            )}
          </MainContent>
        </BaseContainer>
      )}
    </Wrapper>
  );
};
