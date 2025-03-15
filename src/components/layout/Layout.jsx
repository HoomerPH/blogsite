import styled from 'styled-components'
import Header from './Header'

const LayoutWrapper = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.background};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: fixed;
    top: 0; 
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => theme.gradientOverlay};
    pointer-events: none;
    z-index: 0;
  }
`

const MainContent = styled.main`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  padding: ${({ theme }) => `calc(${theme.spacing.xl} * 3) ${theme.spacing.md} ${theme.spacing.xl}`};
  position: relative;
  z-index: 1;

  @media (min-width: 768px) {
    padding: ${({ theme }) => `calc(${theme.spacing.xl} * 3) ${theme.spacing.xl} ${theme.spacing.xl}`};
  }
`

const GradientOrb = styled.div`
  position: fixed;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  background: ${({ theme }) => `radial-gradient(circle, ${theme.primary}20 0%, transparent 70%)`};
  filter: blur(80px);
  opacity: 0.5;
  pointer-events: none;
  transition: all 0.5s ease;
  z-index: 0;

  &.top-right {
    top: -300px;
    right: -300px;
    animation: float 20s infinite alternate;
  }

  &.bottom-left {
    bottom: -300px;
    left: -300px;
    animation: float 15s infinite alternate-reverse;
  }

  @keyframes float {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(50px, -50px);
    }
  }
`

const Layout = ({ children }) => {
  return (
    <LayoutWrapper>
      <GradientOrb className="top-right" />
      <GradientOrb className="bottom-left" />
      <Header />
      <MainContent>{children}</MainContent>
    </LayoutWrapper>
  )
}

export default Layout