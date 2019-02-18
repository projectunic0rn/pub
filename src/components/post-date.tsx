import * as React from 'react';

import styled from '@styled-components';

interface PostDateProps {
  date: string;
}

const Wrapper = styled.div`
  margin: 0 auto 2em;
  max-width: ${({ theme }) => theme.sizes.maxWidthCentered};
`;

const Date = styled.p`
  display: inline-block;
  span {
    font-weight: 600;
  }
`;

const PostDate: React.FunctionComponent<PostDateProps> = ({ date }) => {
  return (
    <Wrapper>
      <Date>
        <span>Published:</span> {date}
      </Date>
    </Wrapper>
  );
};

export default PostDate;
