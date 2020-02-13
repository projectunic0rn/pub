declare module '*.jpg';
declare module '*.png';
declare module '*.ico';
declare module '*.svg';

declare module 'gatsby-plugin-mailchimp' {
  interface Field {
    [key: string]: string;
  }

  interface MailChimpPluginResponse {
    result: 'success' | 'error';
    msg: string;
  }

  /** Subscribe an email address to a Mailchimp email list. */
  export default async function addToMailchimp(
    /** The email address you want to subscribe */
    email: string,
    /** Additional info (columns) you want included with this subscriber */
    fields?: Field,
    /**
     * If you want to override the default MC mailing list that's listed in your
     * gatsby-config, pass the list in here
     */
    endpointOverride?: string,
  ): Promise<MailChimpPluginResponse>;
}

declare module 'typography-theme-ocean-beach' {
  import { TypographyOptions } from 'typography';

  const Theme: TypographyOptions;

  export = Theme;
}

declare module 'react-aria-offcanvas' {
  type Position = 'left' | 'right' | 'top' | 'bottom';

  interface Style {
    container?: CSSProperties;
    overlay?: CSSProperties;
    content?: CSSProperties;
  }

  interface OffCanvasProps {
    /** Open or close OffCanvas. */
    isOpen: boolean;
    /** The width of OffCanvas. */
    width?: string;
    /** The height of OffCanvas. */
    height?: string;
    /** Position OffCanvas to the `left`, `right`, `top` or `bottom`. */
    position?: Position;
    /**
     * Allow `OffCanvas` to push your page. Pass a valid CSS selector of an
     * element that should be pushed.
     */
    mainContainerSelector?: string;
    /** Callback fired when the overlay is clicked or esc key is pressed. */
    onClose?: () => void;
    /** Close `OffCanvas` on esc key. */
    closeOnEsc?: boolean;
    /** Close `OffCanvas` on overlay click. */
    closeOnOverlayClick?: boolean;
    /** Trap focus when `OffCanvas` is open. */
    trapFocusAfterOpen?: boolean;
    /**
     * Return focus to the element that had focus before opening `OffCanvas`.
     */
    returnFocusAfterClose?: boolean;
    /** Lock `body` overflow on menu open. */
    lockBodyAfterOpen?: boolean;
    /** Set initial focus on the first focusable child inside `OffCanvas`. */
    focusFirstChildAfterOpen?: boolean;
    /**
     * Set initial focus on a specific child inside `OffCanvas`. Pass a valid
     * CSS selector of an element that should receive initial focus.
     */
    focusThisChildAfterOpen?: string;
    /** Inline styles object. It has two keys: `overlay` - overlay styles; and
     * `content` - `OffCanvas` styles.
     */
    style?: Style;
    /** Custom `className` for `OffCanvas`. */
    className?: string;
    /** Custom `className` for the overlay. */
    overlayClassName?: string;
    /** Custom role for `OffCanvas`. */
    role?: string;
    /** Custom aria-label for `OffCanvas`. */
    label?: string;
    /** Custom aria-labelledby for `OffCanvas`. */
    labelledby?: string;
    children: React.ReactNode;
  }

  class OffCanvas extends React.Component<OffCanvasProps> {}
  export = OffCanvas;
}
