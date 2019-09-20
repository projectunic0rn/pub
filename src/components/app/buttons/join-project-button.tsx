import * as React from 'react';
import Button from './button';
import { theme } from '@styles';

interface JoinProjectButtonProps {
  onClick: Function;
}

const style = {
  float: 'right',
  position: 'absolute',
  bottom: '15px',
  right: '15px',
  marginTop: '10px',
};

const JoinProjectButton: React.FC<JoinProjectButtonProps> = ({ onClick }) => (
  <Button
    background={theme.colors.highlight}
    backgroundHover={theme.colors.highlightDark}
    onClick={onClick}
    style={style}
  >
    Join
  </Button>
);

export default JoinProjectButton;
