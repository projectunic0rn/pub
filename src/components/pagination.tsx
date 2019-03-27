import { Link } from 'gatsby';
import * as React from 'react';

import styled from '@styled-components';

interface PaginationProps {
  context: {
    tag?: string;
    slug?: string;
    limit?: number;
    skip?: number;
    numPages?: number;
    currentPage?: number;
  };
  prefix?: string;
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  margin: -2em auto 0;
  width: 100%;
  max-width: ${({ theme }) => theme.sizes.maxWidth};
  padding: 0 1.5em 2em;

  a {
    background: transparent;
    color: ${({ theme }) => theme.colors.base};
    padding: 1em 0.8em;
    border-color: ${({ theme }) => theme.colors.highlight};
    border-radius: 2px;
    text-decoration: none;
    transition: 0.2s;

    &:hover {
      background: ${({ theme }) => theme.colors.highlight};
      color: white;
    }
  }
`;

const PreviousLink = styled(Link)`
  margin-right: auto;
  order: 1;
`;

const NextLink = styled(Link)`
  margin-left: auto;
  order: 3;
`;

const PageIndicator = styled.span`
  color: darkslategray;
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  text-align: center;
  padding: 1em 1.5em;
  z-index: -1;
  opacity: 0.7;
`;

const Pagination: React.FC<PaginationProps> = ({ context, prefix }) => {
  const { numPages, currentPage = 1 } = context;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const isNotPaginated = isFirst && isLast;

  const prevPageNum = currentPage - 1 === 1 ? `` : currentPage - 1;
  const nextPageNum = currentPage + 1;

  const pathPrefix = prefix ? `/${prefix}/` : '/';
  const prevPageLink = isFirst ? null : `${pathPrefix}${prevPageNum}/`;
  const nextPageLink = isLast ? null : `${pathPrefix}${nextPageNum}/`;

  return (
    <Wrapper>
      {!isFirst && prevPageLink && (
        <PreviousLink to={prevPageLink}>&#8592; Prev Page</PreviousLink>
      )}

      {!isNotPaginated && (
        <PageIndicator>
          {currentPage}/{numPages}
        </PageIndicator>
      )}

      {!isLast && nextPageLink && (
        <NextLink to={nextPageLink}>Next Page &#8594;</NextLink>
      )}
    </Wrapper>
  );
};

export default Pagination;
