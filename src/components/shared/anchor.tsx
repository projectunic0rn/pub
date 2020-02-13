import React, { AnchorHTMLAttributes, FC } from 'react';

interface OwnProps {
  /**
   * If `true`, the `target` and provided `rel` attribute values will be passed
   * to the return component.
   */
  external?: boolean;
  /**
   * If `children` is _falsey_, this value will be the child of the returned
   * anchor element.
   */
  content?: string;
}

type AnchorProps = OwnProps & AnchorHTMLAttributes<HTMLAnchorElement>;

/**
 * Wrapper for a plain anchor element that sets the `rel` and `target`
 * attributes for external links.
 */
const Anchor: FC<AnchorProps> = ({
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
