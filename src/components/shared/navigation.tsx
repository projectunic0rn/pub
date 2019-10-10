import React, { useState, useEffect } from 'react';
import NavigationDesktop from './navigation-desktop';
import NavigationMobile from './navigation-mobile';

export interface NavigationLink {
  content: string;
  href: string;
  title?: string;
  requiresAuthentication: boolean;
  button?: boolean;
  link?: boolean;
  profileIcon?: boolean;
}

interface OwnProps {
  navLinks: NavigationLink[];
}

type NavigationProps = OwnProps;

const Navigation: React.FC<NavigationProps> = ({ navLinks = [] }) => {
  const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;

    return {
      width,
      height,
    };
  };

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions(),
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav>
      {windowDimensions.width <= 750 ? (
        <NavigationMobile navLinks={navLinks} />
      ) : (
        <NavigationDesktop navLinks={navLinks} />
      )}
    </nav>
  );
};

export default Navigation;
