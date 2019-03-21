import * as React from 'react';

import { styleLengths } from '@utils';

interface OwnProps {
  [index: string]: unknown;
}

type SvgIconProps = OwnProps & React.SVGProps<SVGSVGElement>;

const SvgIcon: React.FunctionComponent<SvgIconProps> = ({
  fontSize,
  children,
  ...svgProps
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      color="inherit"
      width={styleLengths(fontSize)}
      height={styleLengths(fontSize)}
      {...svgProps}
    >
      {children}
    </svg>
  );
};

export default SvgIcon;
