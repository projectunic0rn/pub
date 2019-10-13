import { css } from 'styled-components';

export const slickSliderStyle = css`
  @font-face {
    font-family: 'slick';
    font-weight: normal;
    font-style: normal;

    src: url('/slick.eot');
    src: url('/slick.eot?#iefix') format('embedded-opentype'),
      url('/slick.woff') format('woff'), url('/slick.ttf') format('truetype'),
      url('/slick.svg#slick') format('svg');
  }

  .slick {
    &-slider {
      box-sizing: border-box;
      display: block;
      position: relative;
      user-select: none;

      -webkit-touch-callout: none;
      -khtml-user-select: none;
      -ms-touch-action: pan-y;
      touch-action: pan-y;
      -webkit-tap-highlight-color: transparent;

      & .slick-track,
      & .slick-list {
        transform: translate3d(0, 0, 0);
      }
    }

    &-list {
      display: block;
      margin: 0;
      overflow: hidden;
      padding: 0;
      position: relative;

      &:focus {
        outline: none;
      }

      &.dragging {
        cursor: pointer;
        cursor: hand;
      }
    }

    &-track {
      display: block;
      left: 0;
      margin-left: auto;
      margin-right: auto;
      position: relative;
      top: 0;

      &:before,
      &:after {
        content: '';
        display: table;
      }

      &:after {
        clear: both;
      }
    }

    &-loading {
      & .slick-track {
        visibility: hidden;
      }

      & .slick-slide {
        visibility: hidden;
      }
    }

    &-slide {
      display: none;
      float: left;
      height: 100%;
      min-height: 1px;

      & img {
        display: block;
      }

      &.slick-loading img {
        display: none;
      }

      &.dragging img {
        pointer-events: none;
      }
    }

    [dir='rtl'] &-slide {
      float: right;
    }

    &-initialized &-slide {
      display: block;
    }

    &-vertical &-slide {
      border: 1px solid transparent;
      display: block;
      height: auto;
    }

    &-arrow.slick-hidden {
      display: none;
    }

    &-loading &-list {
      background: #fff url('/ajax-loader.gif') center center no-repeat;
    }

    &-prev,
    &-next {
      background: transparent;
      border: none;
      color: transparent;
      cursor: pointer;
      display: block;
      font-size: 0;
      height: 20px;
      line-height: 0;
      outline: none;
      padding: 0;
      position: absolute;
      top: 50%;
      transform: translate(0, -50%);
      width: 20px;

      &:hover,
      &:focus {
        color: transparent;
        outline: none;
        background: transparent;

        &:before {
          opacity: 1;
        }
      }

      &.slick-disabled:before {
        opacity: 0.25;
      }

      &:before {
        color: white;
        font-family: 'slick';
        font-size: 20px;
        line-height: 1;
        opacity: 0.75;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
    }

    &-prev {
      left: -25px;

      [dir='rtl'] & {
        right: -25px;
        left: auto;
      }

      &:before {
        content: '←';
      }

      [dir='rtl'] &:before {
        content: '→';
      }
    }

    &-next {
      right: -25px;

      [dir='rtl'] & {
        right: auto;
        left: -25px;
      }

      &:before {
        content: '→';
      }

      [dir='rtl'] &:before {
        content: '←';
      }
    }

    &-dotted.slick-slider {
      margin-bottom: 30px;
    }

    &-dots {
      bottom: -25px;
      display: block;
      list-style: none;
      margin: 0;
      padding: 0;
      position: absolute;
      text-align: center;
      width: 100%;

      & li {
        cursor: pointer;
        display: inline-block;
        height: 20px;
        margin: 0 5px;
        padding: 0;
        position: relative;
        width: 20px;

        & button {
          background: transparent;
          border: 0;
          color: transparent;
          cursor: pointer;
          display: block;
          font-size: 0;
          height: 20px;
          line-height: 0;
          outline: none;
          padding: 5px;
          width: 20px;

          &:hover,
          &:focus {
            outline: none;

            &:before {
              opacity: 1;
            }
          }

          &:before {
            color: black;
            content: '•';
            font-family: 'slick';
            font-size: 6px;
            height: 20px;
            left: 0;
            line-height: 20px;
            opacity: 0.25;
            position: absolute;
            text-align: center;
            top: 0;
            width: 20px;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
        }

        &.slick-active button:before {
          color: black;
          opacity: 0.75;
        }
      }
    }
  }
`;
