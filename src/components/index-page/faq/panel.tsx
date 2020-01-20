import React, { FC, useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { Qa } from './qas';

interface PanelProps {
  qa: Qa;
  activeTab: number;
  index: number;
  activateTab: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

interface InnerProps {
  height: number;
}

interface CommonProps {
  isActive: boolean;
}

type AnswerProps = CommonProps;
type QuestionProps = CommonProps;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.section};
`;

const Answer = styled.div<AnswerProps>`
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.9em;
  margin: 0.3125em 1.5625em 1.5625em;
  opacity: ${({ isActive }) => (isActive ? 1 : 0)};
  transition: opacity 0.3s linear 0.18s;
`;

const Question = styled.button<QuestionProps>`
  background: none;
  border: none;
  color: ${({ isActive, theme }) =>
    isActive ? theme.colors.base : theme.colors.text};
  cursor: pointer;
  display: block;
  font-weight: 800;
  font-size: 1em;
  font-family: inherit;
  padding: 1.5625em 3.75em 1.5625em 1.5625em;
  position: relative;
  text-align: left;
  transition: color 0.2s linear;
  width: 100%;

  &:focus {
    outline: none;
  }

  &:after,
  &:before {
    background-color: ${({ theme }) => theme.colors.text};
    content: '';
    height: 0.125em;
    margin-top: 0.125em;
    position: absolute;
    right: 1.5625em;
    top: 50%;
    transition: transform 0.35s cubic-bezier(0.65, 0.05, 0.36, 1);
    width: 1.375em;
  }

  &:after {
    transform: ${({ isActive }) =>
      isActive ? 'rotate(0deg)' : 'rotate(-180deg)'};
  }

  &:before {
    transform: ${({ isActive }) =>
      isActive ? 'rotate(0deg)' : 'rotate(-90deg)'};
  }
`;

const Inner = styled.div<InnerProps>`
  height: ${({ height }) => height}px;
  overflow: hidden;
  transition: height 0.4s cubic-bezier(0.65, 0.05, 0.36, 1);
  will-change: height;
`;

const Panel: FC<PanelProps> = ({ qa, activeTab, index, activateTab }) => {
  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const isActive = activeTab === index;

  useLayoutEffect(() => {
    if (ref && ref.current) {
      setHeight(ref.current.scrollHeight);
    }
  }, []);

  return (
    <Wrapper role="tabpanel" aria-expanded={isActive}>
      <Question isActive={isActive} role="tab" onClick={activateTab}>
        {qa.question}
      </Question>

      <Inner
        ref={(v) => (ref.current = v)}
        height={isActive ? height : 0}
        aria-hidden={!isActive}
      >
        <Answer isActive={isActive}>
          {typeof qa.answer === 'string' ? <p>{qa.answer}</p> : qa.answer}
        </Answer>
      </Inner>
    </Wrapper>
  );
};

export default Panel;
