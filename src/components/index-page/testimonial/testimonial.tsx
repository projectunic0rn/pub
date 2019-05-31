import * as React from 'react';
import Slider from 'react-slick';

import Card from './card';
import { content } from './content';
import styled from '@styled-components';

const Wrapper = styled.div`
  background: ${({ theme }) => theme.colors.baseinvert};
  border-radius: 0.375em;
  box-shadow: 0 0.875em 1.75em ${({ theme }) => theme.colors.shadow};
  flex: 1;
  margin: 3.125em 0;
  padding: 1.5625em;
  max-width: 25em;
  width: 100%;

  @media screen and (min-width: ${({ theme }) => theme.sizes.width.small}) {
    width: 95%;
  }
`;

const Testimonial: React.FC = () => {
  const ref = React.useRef<Slider | null>(null);

  return (
    <Wrapper>
      <Slider
        autoplay
        dots
        infinite
        vertical={false}
        slidesToScroll={1}
        slidesToShow={1}
        ref={(v) => (ref.current = v)}
      >
        {content.map((v) => (
          <Card key={v.author} {...v} />
        ))}
      </Slider>
    </Wrapper>
  );
};

export default Testimonial;
