import { Link } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';
import * as React from 'react';

import styled from '@styled-components';

interface PostProps {
  featured: boolean;
}

interface CardProps {
  /** The slugged title of the blog post. */
  slug: string;
  /** Used by `gatsby-image` to display the properly-sized hero image. */
  fluid: FluidObject;
  /** The title of the blog post. */
  title: string;
  /** The publish date of the blog post. */
  publishDate: string;
  /** A short preview of the blog post. */
  excerpt: string;
  /** If `true`, the styling for the featured blog post will be applied. */
  featured?: boolean;
}

const Post = styled.li<PostProps>`
  position: relative;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 2px;
  width: 100%;
  transition: 0.2s;

  @media screen and (min-width: ${({ theme }) => theme.responsive.small}) {
    flex: ${({ featured }) => (featured ? '0 0 100%' : '0 0 49%')};
    margin: 0 0 2vw 0;
  }

  @media screen and (min-width: ${({ theme }) => theme.responsive.medium}) {
    flex: ${({ featured }) => (featured ? '0 0 100%' : '0 0 32%')};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.tertiary};
  }

  a {
    display: flex;
    flex-flow: column;
    height: 100%;
    width: 100%;
    color: ${({ theme }) => theme.colors.base};
    text-decoration: none;

    h2 {
      transition: color 0.2s;
    }

    &:hover {
      color: ${({ theme }) => theme.colors.base};

      h2 {
        color: ${({ theme }) => theme.colors.highlight};
      }
    }

    .gatsby-image-wrapper {
      height: 0;
      padding-bottom: 60%;

      @media screen and (min-width: ${({ theme }) => theme.responsive.small}) {
        padding-bottom: ${({ featured }) => (featured ? '40%' : '60%')};
      }
    }
  }
`;

const StyledLink = styled(Link)`
  background-image: none;
`;

const Title = styled.h2`
  text-transform: capitalize;
  margin: 1rem 1rem 0.5rem 1rem;
`;

const Date = styled.p`
  margin: 0 1rem 1.5rem 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

const Excerpt = styled.p`
  padding: 0 1rem 1rem 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

/** Shows a blog post's condensed details. */
const Card: React.FC<CardProps> = ({
  slug,
  title,
  publishDate,
  excerpt,
  featured = false,
  fluid,
}) => (
  <Post featured={featured}>
    <StyledLink to={`/blog/${slug}/`} title={title}>
      <Img fluid={fluid} backgroundColor="#eeeeee" title={title} alt="" />
      <Title>{title}</Title>
      <Date>{publishDate}</Date>
      <Excerpt dangerouslySetInnerHTML={{ __html: excerpt }} />
    </StyledLink>
  </Post>
);

export default Card;
