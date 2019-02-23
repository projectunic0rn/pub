import { Link } from 'gatsby';
import * as React from 'react';

import styled from '@styled-components';
import { slugify } from '@utils';

interface PostTagsProps {
  tags: string[];
}

const List = styled.ul`
  width: 100%;
  margin: 0 auto 1em auto;
  max-width: ${({ theme }) => theme.sizes.maxWidthCentered};
`;

const Tag = styled.li`
  display: inline-block;
  margin: 0 0.25em 0.25em 0;

  a {
    float: left;
    font-size: 0.8em;
    transition: 0.2s;
    background: ${({ theme }) => theme.colors.tertiary};
    padding: 0.5em;
    border-radius: 2px;
    text-transform: capitalize;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.base};
    border: 1px solid ${({ theme }) => theme.colors.secondary};

    &:hover {
      background: ${({ theme }) => theme.colors.secondary};
      color: ${({ theme }) => theme.colors.base};
    }
  }
`;

const PostTags: React.FunctionComponent<PostTagsProps> = ({ tags }) => (
  <List>
    {tags.map((tag) => (
      <Tag key={tag}>
        <Link to={`/tag/${slugify(tag)}/`}>{tag}</Link>
      </Tag>
    ))}
  </List>
);

export default PostTags;
