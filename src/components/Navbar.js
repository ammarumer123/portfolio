import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background: rgba(26, 26, 26, 0.95);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  border-bottom: 1px solid rgba(74, 144, 226, 0.1);
`;

const NavLinks = styled.div`
  display: flex;
  gap: 3rem;
  padding: 0 2rem;
`;

const NavLink = styled(Link)`
  color: #E0E0E0;
  text-decoration: none;
  font-size: 1rem;
  position: relative;
  padding: 0.5rem;
  transition: color 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 500;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: #4A90E2;
    transition: width 0.3s ease;
  }

  &:hover {
    color: #4A90E2;
    
    &::after {
      width: 100%;
    }
  }

  &.active {
    color: #4A90E2;
    
    &::after {
      width: 100%;
    }
  }
`;

function Navbar() {
  return (
    <NavContainer>
      <NavLinks>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/projects">Projects</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </NavLinks>
    </NavContainer>
  );
}

export default Navbar; 