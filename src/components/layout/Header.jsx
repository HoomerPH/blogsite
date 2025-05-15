import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useState } from 'react'

const HeaderContainer = styled.header`
  background: ${({ theme }) => `linear-gradient(145deg, ${theme.surface}90, ${theme.surface}80)`};
  backdrop-filter: blur(8px);
  border-bottom: 1px solid ${({ theme }) => `${theme.border}40`};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`

const HeaderContent = styled.div`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: #DDA853;
  text-decoration: none;
  transition: ${({ theme }) => theme.transition};

  &:hover {
    color: #27548A;
  }
`

const Nav = styled.nav`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: ${props => props.$isOpen ? '0' : '-100%'};
    height: 100vh;
    width: 250px;
    background: ${({ theme }) => `linear-gradient(145deg, ${theme.surface}95, ${theme.surface}90)`};
    backdrop-filter: blur(10px);
    flex-direction: column;
    padding: ${({ theme }) => theme.spacing.xl};
    transition: 0.3s ease-in-out;
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
  }
`

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: ${({ theme }) => theme.transition};

  &:hover {
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.primary};
  }

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
    padding: ${({ theme }) => theme.spacing.md};
  }
`

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1001;

  @media (max-width: 768px) {
    display: block;
  }
`

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/"> OJT Blog </Logo>
        <MobileMenuButton onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </MobileMenuButton>
        <Nav $isOpen={isMenuOpen}>
          <NavLink to="/" onClick={closeMenu}>Home</NavLink>
          <NavLink to="/about" onClick={closeMenu}>About</NavLink>
          <NavLink to="/skills" onClick={closeMenu}>Skills</NavLink>
          <NavLink to="/projects" onClick={closeMenu}>Projects</NavLink>
          <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
        </Nav>
      </HeaderContent>
    </HeaderContainer>
  )
}

export default Header