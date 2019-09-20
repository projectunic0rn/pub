import * as React from 'react';

import Button from './button';

interface LeaveProjectButtonProps {
  onClick: Function;
}

const style = {
  float: 'right',
  position: 'absolute',
  bottom: '15px',
  right: '15px',
  marginTop: '10px',
};

const LeaveProjectButton: React.FC<LeaveProjectButtonProps> = ({ onClick }) => (
  <Button
    background={'#ff6584'}
    backgroundHover={''}
    onClick={onClick}
    style={style}
  >
    Leave
  </Button>
);

export default LeaveProjectButton;
