import * as React from 'react';

interface OwnProps {
  external?: boolean;
  content?: string;
}

type AnchorProps = OwnProps & React.AnchorHTMLAttributes<HTMLAnchorElement>;

const Anchor: React.FC<AnchorProps> = ({
  external = true,
  content,
  children,
  rel,
  target,
  ...anchorProps
}) => {
  const props = {
    rel: external ? rel || 'nofollow noopener noreferrer' : rel,
    target: external ? target || '_blank' : target,
    ...anchorProps,
  };

  return <a {...props}>{children || content}</a>;
};

export default Anchor;
