import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaLightbulb, FaArrowUp } from 'react-icons/fa';
import { BiHappy } from 'react-icons/bi';

// Reusing styled components from other Week pages - adjust if needed
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
    content: '';
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
  overflow: hidden; // Changed from visible to hidden for cleaner image containment
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
    transform: scale(1.03); // Keep hover effect if desired, or remove if ImageContainer handles it
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

const Week4 = () => {
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
        <Title>Week 4: Database Design & First UI Implementation</Title>
        <Date>February 24-28, 2025</Date>
      </Header>

      <Section>
        <SectionTitle>Database Schema for BU HealthSync+</SectionTitle>
        <Content>
          <Paragraph>
            This week marked a significant step forward as we finalized the initial <Highlight>database schema</Highlight> for BU HealthSync+.
            This involved identifying key entities, their attributes, and the relationships between them. We focused on creating a robust and scalable database structure that can support all planned features of the application.
          </Paragraph>
          <Paragraph>
            Key tables designed include:
          </Paragraph>
          <List>
            <li><Highlight>Users:</Highlight> Storing user credentials, roles (student, staff, admin, healthcare provider), and personal information.</li>
            <li><Highlight>Profiles:</Highlight> Detailed health profiles, medical history, and emergency contact information.</li>
            <li><Highlight>Appointments:</Highlight> Managing clinic appointments, schedules, and statuses.</li>
            <li><Highlight>MedicalRecords:</Highlight> Securely storing consultation notes, prescriptions, and lab results.</li>
            <li><Highlight>Notifications:</Highlight> Handling reminders for appointments and health advisories.</li>
          </List>
          <Paragraph>
            We used ERD (Entity Relationship Diagram) tools to visualize the schema and ensure data integrity through proper normalization and constraints.
          </Paragraph>
        </Content>
      </Section>

      <Section>
        <SectionTitle>Mobile App: Landing Screen Development</SectionTitle>
        <Content>
          <Paragraph>
            With the database structure taking shape, I shifted my focus to the <Highlight>mobile application development</Highlight>.
            My first major task was to create the <Highlight>Landing Screen</Highlight> for the BU HealthSync+ app using React Native.
            This screen will be the first point of interaction for users, so it needed to be welcoming, informative, and visually appealing.
          </Paragraph>
          <Paragraph>
            The Landing Screen includes:
          </Paragraph>
          <List>
            <li>App Logo and Name</li>
            <li>A brief tagline or welcome message</li>
            <li>Buttons for "Login" and "Register"</li>
            <li>Potentially a carousel for featured health tips or announcements (planned for later iteration)</li>
          </List>
          <Paragraph>
            I focused on creating a clean UI, ensuring responsiveness across different screen sizes, and setting up basic navigation to the login and registration screens.
          </Paragraph>
        </Content>
      </Section>
      
      <Section>
        <SectionTitle>Development Highlights & Challenges</SectionTitle>
        <Content>
          <ImageGrid>
            <ImageContainer>
              <figure>
                <BlogImage 
                  src="/OJT/Week 4/image.png" 
                  alt="Database ERD Snippet"
                />
                <Caption>Snippet of the BU HealthSync+ ERD</Caption>
              </figure>
            </ImageContainer>
            <ImageContainer>
              <figure>
                <BlogImage 
                  src="/OJT/Week 4/image copy.png" 
                  alt="Mobile App Landing Screen Mockup/Screenshot"
                />
                <Caption>Early version of the Mobile App Landing Screen</Caption>
              </figure>
            </ImageContainer>
          </ImageGrid>
          <Paragraph>
            A key challenge this week was translating the conceptual database design into a concrete SQL schema, considering future scalability. For the mobile app, ensuring a consistent look and feel with the planned branding guidelines was a primary focus.
          </Paragraph>
        </Content>
      </Section>

      <Section>
        <SectionTitle>Key Takeaways</SectionTitle>
        <Content>
          <List>
            <li>Gained hands-on experience in database design and ERD creation.</li>
            <li>Successfully implemented the first UI screen for the mobile application using React Native.</li>
            <li>Learned about the importance of clear requirements for both backend and frontend development.</li>
            <li>Improved skills in using styled-components for UI development in React Native.</li>
          </List>
          <Paragraph>
            Week 4 was about laying critical foundations. I'm excited to build upon the database and UI work in the coming weeks, focusing on user authentication and core app functionalities.
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
        <StyledNavButton to="/week3">← Go Back to Week 3</StyledNavButton>
        <div>{/* Placeholder for "Proceed to Week 5" button */}</div>
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

export default Week4;
