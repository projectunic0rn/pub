import { Link } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';
import React, { FC } from 'react';
import styled from 'styled-components';

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
  border-radius: 0.3125em;
  width: 100%;
  transition: 0.2s;

  @media screen and (min-width: ${({ theme }) => theme.responsive.small}) {
    flex: ${({ featured }) => (featured ? '0 0 100%' : '0 0 49%')};
    margin: 0 0 2vw 0;
  }

  @media screen and (min-width: ${({ theme }) => theme.responsive.medium}) {
    flex: ${({ featured }) => (featured ? '0 0 100%' : '0 0 32%')};
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

    @media (hover: hover) {
      &:hover {
        color: ${({ theme }) => theme.colors.base};

        h2 {
          color: ${({ theme }) => theme.colors.highlight};
        }
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

const StyledImg = styled(Img)`
  border-radius: 0.375em;
`;

const Text = styled.div`
  margin: 0;
  padding: 1em;
`;

const Title = styled.h2`
  text-transform: capitalize;
  margin: 0.5em 0 1em;
`;

const Date = styled.p`
  margin: 0 0 0.5em 0;
  color: ${({ theme }) => theme.colors.text};
`;

const Excerpt = styled.p`
  color: ${({ theme }) => theme.colors.text};
`;

/** Shows a blog post's condensed details. */
const Card: FC<CardProps> = ({
  slug,
  title,
  publishDate,
  excerpt,
  featured = false,
  fluid,
}) => (
  <Post featured={featured}>
    <StyledLink to={`/blog/${slug}/`} title={title}>
      <StyledImg fluid={fluid} backgroundColor="#eeeeee" title={title} alt="" />

      <Text>
        <Title>{title}</Title>
        <Date>{publishDate}</Date>
        <Excerpt dangerouslySetInnerHTML={{ __html: excerpt }} />
      </Text>
    </StyledLink>
  </Post>
);

export default Card;
