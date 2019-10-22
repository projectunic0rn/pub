import { css } from 'styled-components';

export type CtaButtonVariant = 'default' | 'secondary';
export type CtaButtonType = 'button' | 'input';

export interface OwnProps {
  /** The text to display inside the button. */
  content?: string;
  /** Determines the style of the button. */
  variant?: CtaButtonVariant;
  /** Checks whether the button is a regular butotn or a form input button type. */
  type?: CtaButtonType;
}

export interface ButtonProps {
  variant: CtaButtonVariant;
}

const ButtonTemplate = css<ButtonProps>`
  border-radius: 0.3125em;
  font-weight: 800;
  padding: 0.9375em 2.8125em;
  transition: 0.15s;

  ${({ variant, theme }) => {
    switch (variant) {
      case 'secondary':
        return css`
          background: transparent;
          border: 0.1875rem solid ${theme.colors.baseinvert};
        `;
      case 'default':
      default:
        return css`
          background: ${theme.colors.highlight};
          border: 0.0625rem solid ${theme.colors.highlight};
        `;
    }
  }};

  :hover {
    cursor: pointer;
  }

  @media screen and (max-width: ${({ theme }) => theme.sizes.width.small}) {
    display: block;
    margin: 0 auto;
    width: 100%;
  }

  @media (hover: hover) {
    &:hover {
      background: ${({ theme }) => theme.colors.highlightDark};
      border-color: transparent;
    }
  }

  && {
    color: ${({ theme }) => theme.colors.baseinvert};
  }
`;

export default ButtonTemplate;
