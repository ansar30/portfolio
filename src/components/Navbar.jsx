import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const HeaderContainer = styled.header`
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;
`;

const NavigationBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 4rem;
  background: ${({ isScrolled }) =>
    isScrolled ? 'rgba(40, 44, 52, 0.95)' : 'transparent'};
  backdrop-filter: ${({ isScrolled }) =>
    isScrolled ? 'blur(10px)' : 'none'};
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 1rem 2rem;
  }
`;

// const BrandLogo = styled(Link)`
//   color: #61dafb;
//   text-decoration: none;
//   font-size: 1.5rem;
//   font-weight: bold;
//   transition: transform 0.3s ease;

//   &:hover {
//     transform: scale(1.05);
//   }
// `;

const NavigationLinks = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: center;
    background: rgba(40, 44, 52, 0.95);
    padding: 1rem;
    gap: 1rem;
  }
`;

const NavigationItem = styled(Link)`
  color: #61dafb;
  text-decoration: none;
  font-size: 1.1rem;
  position: relative;
  transition: color 0.3s ease;

  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -4px;
    left: 0;
    background-color: #61dafb;
    transition: width 0.3s ease;
  }

  &:hover:after,
  &.active:after {
    width: 100%;
  }
`;

const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #61dafb;
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <HeaderContainer>
      <NavigationBar isScrolled={isScrolled}>
        {/* <BrandLogo to="/">Dev</BrandLogo> */}
        <span>''</span>
        <HamburgerButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? '✕' : '☰'}
        </HamburgerButton>
        <NavigationLinks isOpen={isMenuOpen}>
          {['Home', 'About', 'Experience', 'Projects', 'Contact'].map((item) => (
            <NavigationItem
              key={item}
              to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
              className={location.pathname === (item === 'Home' ? '/' : `/${item.toLowerCase()}`) ? 'active' : ''}
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </NavigationItem>
          ))}
        </NavigationLinks>
      </NavigationBar>
    </HeaderContainer>
  );
};

export default Navigation;
