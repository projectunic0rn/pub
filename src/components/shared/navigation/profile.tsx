import { navigate } from 'gatsby';
import React, { FC, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import { UserAuthHelper } from '@helpers';
import { dotIcon } from '@images';

interface OwnProps {
  content: string;
  isOnline?: boolean;
  signOut: () => void;
}

type ProfileProps = OwnProps;

const Wrapper = styled.div`
  cursor: pointer;
  position: relative;
`;

const Icon = styled.img`
  border-radius: 100%;
  margin-bottom: -0.9em !important;
`;

const Dot = styled.img`
  position: absolute;
  top: 1.5em;
  right: -0.2em;
`;

const Dropdown = styled.div`
  display: block;
  background: white;
  border: 1px solid lightgray;
  border-radius: 5px;
  position: absolute;
  width: 150px;
  z-index: 2;
  margin-top: 10px;
  right: 0;

  @media screen and (max-width: ${({ theme }) => theme.sizes.width.medium}) {
    display: initial;
    left: 0;
    margin-top: 50px;
    right: initial;
  }
`;

const DropdownItem = styled.div`
  position: relative;
  border-bottom: 1px solid lightgray;
  padding: 10px;
  transition: background 0.2s;
  margin: 0;
  font-weight: normal;

  @media (hover: hover) {
    &:hover {
      background: #e3e3e3;
    }
  }
`;

const Profile: FC<ProfileProps> = ({ content, isOnline = false, signOut }) => {
  const [expanded, setExpanded] = useState(false);

  const close = useCallback(() => {
    setExpanded(false);
  }, []);

  const toggle = () => setExpanded((expanded) => !expanded);
  const goToProfile = () => navigate(`/profile/${UserAuthHelper.getUserId()}`);

  useEffect(() => {
    if (expanded) {
      document.addEventListener('click', close);
      return;
    }
    document.removeEventListener('click', close);
  }, [expanded]);

  return (
    <Wrapper onClick={toggle}>
      <Icon src={content} height={46} width={46} alt="profile image" />
      {isOnline && <Dot src={dotIcon} height={16} width={16} alt="blue dot" />}

      {expanded ? (
        <Dropdown>
          <DropdownItem onClick={goToProfile}>Profile</DropdownItem>
          <DropdownItem
            onClick={() => {
              document.removeEventListener('click', close);
              signOut();
            }}
          >
            Sign Out
          </DropdownItem>
        </Dropdown>
      ) : null}
    </Wrapper>
  );
};

export default Profile;
