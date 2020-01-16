require('prismjs/themes/prism.css');

exports.shouldUpdateScroll = ({ prevRouterProps, routerProps }) => {
  if (prevRouterProps.location.pathname === routerProps.location.pathname) {
    return false;
  }

  window.scrollTo(0, 0);

  return false;
};
