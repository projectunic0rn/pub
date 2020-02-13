import React, { FC, useRef } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';

import Card from './card';
import { content } from './content';

const Wrapper = styled.section`
  background-color: ${({ theme }) => theme.colors.highlightDark};
  padding: ${({ theme }) => theme.boxes.padding.section.medium};
  padding-left: 1em;
  padding-right: 1em;
  width: 100%;

  @media screen and (max-width: ${({ theme }) => theme.sizes.width.small}) {
    padding: ${({ theme }) => theme.boxes.padding.section.small};
  }
`;

const Featured: FC = () => {
  const ref = useRef<Slider | null>(null);

  return (
    <Wrapper>
      <Slider
        autoplay
        autoplaySpeed={5000}
        dots
        infinite
        arrows={false}
        vertical={false}
        slidesToScroll={2}
        slidesToShow={3}
        ref={(v) => (ref.current = v)}
        responsive={[
          {
            breakpoint: 975,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ]}
      >
        {content.map((v, i) => (
          <Card key={i} i={i} />
        ))}
      </Slider>
    </Wrapper>
  );
};

export default Featured;
