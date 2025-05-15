import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { FaHeart, FaLightbulb, FaArrowUp, FaReact, FaDatabase, FaLink, FaYoutube, FaGraduationCap } from 'react-icons/fa';
import { BiHappy } from 'react-icons/bi';
import { Link } from 'react-router-dom';

// Reusing styled components from other week pages
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
  position: relative;
  padding: ${({ theme }) => theme.spacing.md};
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
`;

const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.text};
  ${({ theme }) => theme.typography.h2}
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding-bottom: ${({ theme }) => theme.spacing.xs};
  border-bottom: 2px solid ${({ theme }) => theme.primary};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Content = styled.div`
  color: ${({ theme }) => theme.text};
  ${({ theme }) => theme.typography.body}
  line-height: 1.8;
  position: relative;
  z-index: 1;
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
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin: ${({ theme }) => theme.spacing.xl} 0;
`;

const ImageContainer = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius};
  overflow: hidden;
  background: ${({ theme }) => `linear-gradient(145deg, ${theme.surface}90, ${theme.surface}60)`};
  backdrop-filter: blur(8px);
  border: 1px solid ${({ theme }) => `${theme.border}30`};
  transition: ${({ theme }) => theme.transition};
  position: relative;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }
`;

const BlogImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  display: block;
`;

const Caption = styled.figcaption`
  padding: ${({ theme }) => theme.spacing.sm};
  text-align: center;
  color: ${({ theme }) => theme.textSecondary};
  ${({ theme }) => theme.typography.small}
  background-color: ${({ theme }) => `${theme.surface}90`};
`;

const List = styled.ul`
  list-style-position: inside;
  margin: ${({ theme }) => `${theme.spacing.md} 0 ${theme.spacing.lg}`};
  padding-left: ${({ theme }) => theme.spacing.md};

  li {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    position: relative;
    padding-left: ${({ theme }) => theme.spacing.md};
    
    &::before {
      content: '💡'; 
      color: ${({ theme }) => theme.primary};
      font-weight: bold;
      position: absolute;
      left: 0;
      top: 1px;
    }
  }
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
  background: ${({ theme, $active }) => $active ? theme.primary : 'transparent'};
  color: ${({ theme, $active }) => $active ? theme.background : theme.text};
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  transition: ${({ theme }) => theme.transition};
  border: 1px solid ${({ theme, $active }) => $active ? theme.primary : theme.border };

  &:hover {
    transform: scale(1.05);
    background: ${({ theme, $active }) => !$active && theme.surface};
  }

  svg {
    font-size: 1.2rem;
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

  &.disabled {
    background-color: ${({ theme }) => theme.textSecondary};
    cursor: not-allowed;
    opacity: 0.7;
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

const Week8 = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [reactions, setReactions] = useState({ helpful: 0, inspiring: 0, fun: 0 });
  const [userReaction, setUserReaction] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleReaction = (type) => {
    setReactions(prevReactions => {
      const newReactions = { ...prevReactions };
      if (userReaction === type) {
        newReactions[type] = Math.max(0, newReactions[type] - 1);
        setUserReaction(null);
      } else {
        if (userReaction) {
          newReactions[userReaction] = Math.max(0, newReactions[userReaction] - 1);
        }
        newReactions[type] = (newReactions[type] || 0) + 1;
        setUserReaction(type);
      }
      return newReactions;
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <PageContainer>
      <ProgressBar $width={scrollProgress} />
      <Header>
        <Title>Week 8: Diving into React Native - Authentication & API Endpoints</Title>
        <Date>March 17-21, 2025</Date>
      </Header>

      <Section>
        <SectionTitle><FaYoutube /> Tutorial Deep Dive: React Native Authentication</SectionTitle>
        <Content>
          <Paragraph>
            This week was dedicated to <Highlight>self-paced learning</Highlight>, focusing on how to implement authentication in React Native applications. I spent a significant amount of time watching YouTube tutorials and reading documentation to grasp the core concepts.
          </Paragraph>
          <Paragraph>
            The primary goal was to understand different authentication flows, such as token-based authentication (JWT), and how to manage user sessions securely within a mobile environment.
          </Paragraph>
          <List>
            <li>Explored various methods for storing tokens (e.g., <Highlight>AsyncStorage</Highlight>).</li>
            <li>Learned about context API and global state management for handling authentication status across the app.</li>
            <li>Studied best practices for creating login, registration, and logout functionalities.</li>
          </List>
        </Content>
      </Section>

      <Section>
        <SectionTitle><FaLink /> Connecting React Native to MySQL via API Endpoints</SectionTitle>
        <Content>
          <Paragraph>
            Another crucial area of focus was understanding how a React Native application communicates with a backend server, specifically one using MySQL.
          </Paragraph>
          <Paragraph>
            I researched how to set up and consume <Highlight>RESTful API endpoints</Highlight> to perform CRUD (Create, Read, Update, Delete) operations on a MySQL database. This involved:
          </Paragraph>
          <List>
            <li>Understanding how to make HTTP requests (GET, POST, PUT, DELETE) from React Native using libraries like <Highlight>fetch</Highlight> or <Highlight>Axios</Highlight>.</li>
            <li>Learning about handling API responses, including success and error states.</li>
            <li>Grasping the importance of structuring API requests and managing data flow between the mobile client and the server.</li>
            <li>Considering security aspects like data validation and sanitization on the server-side.</li>
          </List>
        </Content>
      </Section>

      <ImageGrid>
        <ImageContainer>
          <BlogImage src="/Week 8/image.png" alt="React Native Authentication Flow Diagram" />
          <Caption>Team Meeting after Sir Gerald and Sir James assigned us what we will work on </Caption>
        </ImageContainer>
        <ImageContainer>
          <BlogImage src="/Week 8/image copy.png" alt="API Endpoint Interaction with MySQL" />
        </ImageContainer>
      </ImageGrid>

      <Section>
        <SectionTitle><FaGraduationCap /> Key Learnings and Insights</SectionTitle>
        <Content>
          <Paragraph>
            This week of focused learning provided several key insights:
          </Paragraph>
          <List>
            <li><Highlight>State Management is Crucial:</Highlight> Effectively managing authentication state globally in a React Native app is vital for a seamless user experience.</li>
            <li><Highlight>Secure Token Handling:</Highlight> The importance of securely storing and managing authentication tokens on the device cannot be overstated.</li>
            <li><Highlight>API Design Matters:</Highlight> Well-designed API endpoints make the integration between the frontend and backend much smoother.</li>
            <li><Highlight>Asynchronous Operations:</Highlight> A solid understanding of JavaScript's asynchronous nature (Promises, async/await) is essential when dealing with API calls.</li>
          </List>
          <Paragraph>
            While I didn't implement these features in our main project this week, this foundational knowledge is critical for the upcoming development of our mobile application components.
          </Paragraph>
        </Content>
      </Section>
      
      <Section>
        <SectionTitle><FaReact /> Preparing for Future Mobile Development</SectionTitle>
        <Content>
          <Paragraph>
            The knowledge gained this week directly contributes to our long-term goal of potentially improve developing mobile counterpart or specific mobile features for BU HealthSync+. 
          </Paragraph>
          <Paragraph>
            Understanding React Native authentication and backend communication will allow for a more informed approach when we start designing and building those mobile interfaces. This proactive learning ensures we are better prepared for the technical challenges ahead.
          </Paragraph>
        </Content>
      </Section>

      <ReactionBar>
        <ReactionButton $active={userReaction === 'helpful'} onClick={() => handleReaction('helpful')}>
          <FaLightbulb /> Helpful ({reactions.helpful})
        </ReactionButton>
        <ReactionButton $active={userReaction === 'inspiring'} onClick={() => handleReaction('inspiring')}>
          <FaHeart /> Inspiring ({reactions.inspiring})
        </ReactionButton>
        <ReactionButton $active={userReaction === 'fun'} onClick={() => handleReaction('fun')}>
          <BiHappy /> Fun ({reactions.fun})
        </ReactionButton>
      </ReactionBar>

      <NavigationButtonsContainer>
        <StyledNavButton to="/week7">
          &larr; Go Back to Week 7
        </StyledNavButton>
        <StyledNavButton to="/week9">
          Proceed to Week 9 &rarr;
        </StyledNavButton>
      </NavigationButtonsContainer>

      <ScrollToTop $visible={showScrollTop} onClick={scrollToTop}>
        <FaArrowUp />
      </ScrollToTop>
    </PageContainer>
  );
};

export default Week8;
