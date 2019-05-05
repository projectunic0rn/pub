import * as React from 'react';

import { styleLengths } from '@utils';

interface OwnProps {
  [index: string]: unknown;
}

type SvgIconProps = OwnProps & React.SVGProps<SVGSVGElement>;

/** Displays an SVG element where its size can be configured via `fontSize`. */
const SvgIcon: React.FC<SvgIconProps> = ({
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
