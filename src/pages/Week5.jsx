import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaLightbulb, FaArrowUp } from 'react-icons/fa';
import { BiHappy } from 'react-icons/bi';

// Reusing styled components from Week4.jsx
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
  position: relative;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.primary};
  ${({ theme }) => theme.typography.h1}
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Date = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  ${({ theme }) => theme.typography.small}
  font-style: italic;
`;

const Section = styled.section`
  background: ${({ theme }) => `linear-gradient(145deg, ${theme.surface}80, ${theme.surface}40)`};
  backdrop-filter: blur(10px);
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid ${({ theme }) => `${theme.border}40`};
  padding: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  transition: ${({ theme }) => theme.transition};
  position: relative;
  overflow: visible;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }

  &::before {
    content: '' ;
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ theme }) => `radial-gradient(circle, ${theme.primary} 0%, ${theme.secondary} 100%)`};
    filter: blur(2px);
    opacity: 0;
    transition: opacity 0.3s ease;
    animation: rotate-corner ${({ theme }) => theme.animation.cornerLight.duration} cubic-bezier(0.4, 0, 0.2, 1) infinite;
    box-shadow: ${({ theme }) => `${theme.animation.cornerLight.glow} ${theme.primary}40`};
    z-index: 0;
  }

  &:hover::before {
    opacity: 0.9;
  }

  @keyframes rotate-corner {
    0% { top: -5px; left: -5px; }
    25% { top: -5px; left: calc(100% - 5px); }
    50% { top: calc(100% - 5px); left: calc(100% - 5px); }
    75% { top: calc(100% - 5px); left: -5px; }
    100% { top: -5px; left: -5px; }
  }
`;

const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.text};
  ${({ theme }) => theme.typography.h2}
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding-bottom: ${({ theme }) => theme.spacing.xs};
  border-bottom: 2px solid ${({ theme }) => theme.primary};
`;

const Content = styled.div`
  color: ${({ theme }) => theme.text};
  ${({ theme }) => theme.typography.body}
  line-height: 1.8;
  font-size: 1rem;
  position: relative;
  z-index: 1;
  background: ${({ theme }) => `linear-gradient(145deg, ${theme.surface}95, ${theme.surface}90)`};
`;

const Paragraph = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-size: 1rem;
  line-height: 1.8;
`;

const Highlight = styled.span`
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin: ${({ theme }) => theme.spacing.xl} 0;
`;

const ImageContainer = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius};
  overflow: hidden;
  background: ${({ theme }) => `linear-gradient(145deg, ${theme.surface}90, ${theme.surface}60)`};
  backdrop-filter: blur(10px);
  border: 1px solid ${({ theme }) => `${theme.border}40`};
  transition: ${({ theme }) => theme.transition};
  position: relative;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
`;

const BlogImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  transition: ${({ theme }) => theme.transition};
  
  &:hover {
    transform: scale(1.03);
  }
`;

const Caption = styled.figcaption`
  padding: ${({ theme }) => theme.spacing.sm};
  text-align: center;
  color: ${({ theme }) => theme.textSecondary};
  ${({ theme }) => theme.typography.small}
  background-color: ${({ theme }) => theme.surface};
`;

const ProgressBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: ${props => props.$width}%;
  height: 4px;
  background: ${({ theme }) => theme.primary};
  z-index: 1000;
  transition: width 0.2s ease;
`;

const ReactionBar = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;
  margin: ${({ theme }) => theme.spacing.xl} 0;
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => `linear-gradient(145deg, ${theme.surface}80, ${theme.surface}40)`};
  backdrop-filter: blur(10px);
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid ${({ theme }) => `${theme.border}40`};
`;

const ReactionButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border: none;
  background: ${({ theme, $active }) => $active ? theme.primary : theme.background};
  color: ${({ theme, $active }) => $active ? theme.background : theme.text};
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition};

  &:hover {
    transform: scale(1.05);
  }

  svg {
    font-size: 1.2rem;
  }
`;

const ScrollToTop = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.background};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => props.$visible ? '1' : '0'};
  transform: ${props => props.$visible ? 'scale(1)' : 'scale(0.8)'};
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: ${props => props.$visible ? 'scale(1.1)' : 'scale(0.8)'};
  }
`;

const List = styled.ul`
  list-style-position: inside;
  margin: ${({ theme }) => `${theme.spacing.md} 0 ${theme.spacing.lg}`};
  padding-left: ${({ theme }) => theme.spacing.md};

  li {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    position: relative;
    
    &::before {
      content: '•';
      color: ${({ theme }) => theme.primary};
      font-weight: bold;
      margin-right: ${({ theme }) => theme.spacing.sm};
    }
  }
`;

const NavigationButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.md} 0;
`;

const StyledNavButton = styled(Link)`
  background-color: ${({ theme }) => theme.primary};
  color: #ffffff;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  border-radius: ${({ theme }) => theme.borderRadius};
  text-decoration: none;
  font-weight: 600;
  transition: ${({ theme }) => theme.transition};
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  &:hover {
    background-color: ${({ theme }) => theme.secondary};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  }
`;

const Week5 = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [reactions, setReactions] = useState({
    helpful: 0,
    inspiring: 0,
    fun: 0
  });
  const [userReaction, setUserReaction] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleReaction = (type) => {
    if (userReaction === type) {
      setReactions(prev => ({ ...prev, [type]: prev[type] - 1 }));
      setUserReaction(null);
    } else {
      if (userReaction) {
        setReactions(prev => ({ ...prev, [userReaction]: prev[userReaction] - 1 }));
      }
      setReactions(prev => ({ ...prev, [type]: prev[type] + 1 }));
      setUserReaction(type);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <PageContainer>
      <ProgressBar $width={scrollProgress} />
      <Header>
        <Title>Week 5: User Authentication & Patient Dashboard UI</Title>
        <Date>March 3-7, 2025</Date>
      </Header>

      <Section>
        <SectionTitle>Login Page Implementation</SectionTitle>
        <Content>
          <Paragraph>
            This week, my primary focus was on developing the <Highlight>Login Page</Highlight> for BU HealthSync+. This is a critical component for user access and security.
            I implemented the UI using React Native, ensuring it was intuitive and followed our design guidelines.
          </Paragraph>
          <Paragraph>
            Key features of the Login Page include:
          </Paragraph>
          <List>
            <li>Input fields for username/email and password.</li>
            <li>Secure password handling (input masking).</li>
            <li>"Forgot Password" link (functionality to be added later).</li>
            <li>Validation for input fields to provide immediate feedback to the user.</li>
            <li>Integration with backend authentication endpoints (preparation for next week).</li>
          </List>
          <Paragraph>
            Ensuring a seamless and secure login experience was paramount. I spent considerable time on error handling and user feedback mechanisms.
          </Paragraph>
        </Content>
      </Section>

      <Section>
        <SectionTitle>Patient Dashboard - Phase 1 (UI Mockup & Structure)</SectionTitle>
        <Content>
          <Paragraph>
            Alongside the login page, I began designing and structuring the <Highlight>Patient Dashboard</Highlight>. This will be the main hub for patients to view their information, appointments, and medical records.
            For Phase 1, the focus was on creating the UI structure and mockups for key dashboard components.
          </Paragraph>
          <Paragraph>
            Initial components designed for the Patient Dashboard include:
          </Paragraph>
          <List>
            <li>Welcome message and user profile summary.</li>
            <li>Section for upcoming appointments.</li>
            <li>Quick access to recent medical records (placeholder).</li>
            <li>Navigation to other key areas like "My Profile", "Messages", and "Health Resources".</li>
          </List>
          <Paragraph>
            The goal was to create a clean, organized, and easily navigable interface. I used placeholder data to visualize how the information would be presented.
          </Paragraph>
        </Content>
      </Section>
      
      <Section>
        <SectionTitle>Development Snapshots</SectionTitle>
        <Content>
          <ImageGrid>
            <ImageContainer>
              <figure>
                <BlogImage 
                  src="/OJT/Week 5/image.png" 
                  alt="Login Page UI"
                />
                <Caption>BU HealthSync+ Login Page Interface</Caption>
              </figure>
            </ImageContainer>
            <ImageContainer>
              <figure>
                <BlogImage 
                  src="/OJT/Week 5/image copy.png" 
                  alt="Patient Dashboard Mockup"
                />
                <Caption>Early Mockup of the Patient Dashboard</Caption>
              </figure>
            </ImageContainer>
          </ImageGrid>
          <Paragraph>
            Developing these components involved careful consideration of user experience (UX) and interface (UI) design principles. Iterative feedback from the team helped refine the designs.
          </Paragraph>
        </Content>
      </Section>

      <Section>
        <SectionTitle>Key Learnings & Challenges</SectionTitle>
        <Content>
          <List>
            <li>Deepened understanding of form handling and validation in React Native.</li>
            <li>Gained experience in designing user-centric dashboard interfaces.</li>
            <li>Learned about the importance of component reusability for efficient development.</li>
            <li>A challenge was ensuring the design was flexible enough to accommodate future features and data.</li>
          </List>
          <Paragraph>
            Week 5 was about building crucial user-facing components. The login page is nearing completion, and the groundwork for the patient dashboard is set. Next week, I plan to focus on integrating the login functionality with the backend and further developing dashboard components.
          </Paragraph>
        </Content>
      </Section>

      <ReactionBar>
        <ReactionButton 
          onClick={() => handleReaction('helpful')} 
          $active={userReaction === 'helpful'}
        >
          <FaLightbulb />
          Helpful {reactions.helpful > 0 && reactions.helpful}
        </ReactionButton>
        <ReactionButton 
          onClick={() => handleReaction('inspiring')} 
          $active={userReaction === 'inspiring'}
        >
          <FaHeart />
          Inspiring {reactions.inspiring > 0 && reactions.inspiring}
        </ReactionButton>
        <ReactionButton 
          onClick={() => handleReaction('fun')} 
          $active={userReaction === 'fun'}
        >
          <BiHappy />
          Fun {reactions.fun > 0 && reactions.fun}
        </ReactionButton>
      </ReactionBar>

      <NavigationButtonsContainer>
        <StyledNavButton to="/week4">← Go Back to Week 4</StyledNavButton>
        <StyledNavButton to="/week6">Proceed to Week 6 →</StyledNavButton>
      </NavigationButtonsContainer>

      <ScrollToTop 
        onClick={scrollToTop} 
        $visible={showScrollTop}
        aria-label="Scroll to top"
      >
        <FaArrowUp />
      </ScrollToTop>
    </PageContainer>
  );
};

export default Week5;
