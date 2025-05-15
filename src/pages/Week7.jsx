import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { FaHeart, FaLightbulb, FaArrowUp, FaUsersCog, FaTasks, FaUserEdit, FaTools, FaClipboardList, FaComments } from 'react-icons/fa'; // Updated icons
import { BiHappy } from 'react-icons/bi'; // Kept BiHappy for reactions
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
      content: '▹'; // Different bullet point for variety
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

const Week7 = () => {
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
      if (userReaction === type) { // User is deselecting
        newReactions[type] = Math.max(0, newReactions[type] - 1);
        setUserReaction(null);
      } else { // User is selecting a new reaction or changing reaction
        if (userReaction) { // Deselect previous reaction if any
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
        <Title>Week 7: Charting the Course - Planning Next Implementations</Title>
        <Date>March 10-14, 2025</Date>
      </Header>

      <Section>
        <SectionTitle><FaComments /> Sprint Review & Retrospective</SectionTitle>
        <Content>
          <Paragraph>
            This week began with a comprehensive <Highlight>review of Week 6</Highlight>, where we celebrated the successful optimization of the Patient Dashboard. The performance improvements were well-received, and the dashboard is now significantly more responsive.
          </Paragraph>
          <Paragraph>
            Following the review, we held a <Highlight>team retrospective</Highlight> to discuss what went well and identify areas for improvement in our processes. Key discussion points included:
          </Paragraph>
          <List>
            <li>Acknowledging effective collaboration and communication during the optimization tasks.</li>
            <li>Identifying the need for more detailed upfront requirement gathering for complex features.</li>
            <li>Brainstorming ways to enhance our automated testing coverage.</li>
          </List>
          <Paragraph>
            These reflections are crucial for our continuous improvement as a team.
          </Paragraph>
        </Content>
      </Section>

      <Section>
        <SectionTitle><FaClipboardList /> Planning for User Authentication & Profiles</SectionTitle>
        <Content>
          <Paragraph>
            The primary focus of Week 7 was <Highlight>planning the next major sprint</Highlight>, which will revolve around implementing <Highlight>User Authentication</Highlight> and <Highlight>User Profiles</Highlight>. This is a critical step towards personalizing the user experience and securing the application.
          </Paragraph>
          <Paragraph>
            Our planning sessions involved:
          </Paragraph>
          <List>
            <li>Defining detailed requirements for user registration, login (including social login options), password management, and session handling.</li>
            <li>Discussing the architecture for the authentication system, including token-based authentication (JWT) and secure password hashing (bcrypt).</li>
            <li>Outlining the features for user profiles: display information, editable fields, profile pictures, and potentially activity logs or preferences.</li>
            <li>Breaking down the implementation into manageable tasks and user stories for the upcoming sprint.</li>
          </List>
        </Content>
      </Section>

      <ImageGrid>
        <ImageContainer>
          <BlogImage src="/OJT/Week 7/image.png" alt="Whiteboard with Authentication Flow Diagram" />
          <Caption> Us planning and sketching what is the next step of developing </Caption>
        </ImageContainer>
        <ImageContainer>
          <BlogImage src="/OJT/Week 7/image copy.png" alt="User Profile Wireframes" />
        </ImageContainer>
      </ImageGrid>

      <Section>
        <SectionTitle><FaTasks /> Task Breakdown and Technical Considerations</SectionTitle>
        <Content>
          <Paragraph>
            We meticulously broke down the features into smaller tasks. For <Highlight>User Authentication</Highlight>, tasks include:
          </Paragraph>
          <List>
            <li>Setting up the database schema for users (name, email, hashed password, etc.).</li>
            <li>Implementing API endpoints for registration, login, and logout.</li>
            <li>Creating UI components for login and registration forms.</li>
            <li>Integrating JWT for session management and protecting routes.</li>
          </List>
          <Paragraph>
            For <Highlight>User Profiles</Highlight>, the plan includes:
          </Paragraph>
          <List>
            <li>Designing and implementing the profile page UI.</li>
            <li>Developing API endpoints for fetching and updating profile data.</li>
            <li>Handling profile picture uploads and storage.</li>
          </List>
        </Content>
      </Section>
      
      <Section>
        <SectionTitle><FaTools /> Tools, Technologies, and Next Steps</SectionTitle>
        <Content>
          <Paragraph>
            We evaluated the tools and technologies required. We confirmed our stack for the backend (Node.js/Express) and decided to use <Highlight>Passport.js</Highlight> for simplifying authentication logic, along with <Highlight>bcrypt.js</Highlight> for password hashing.
          </Paragraph>
          <Paragraph>
            The next steps involve setting up the initial project structure for these new modules, creating the necessary database migrations, and beginning the development of the core authentication logic in Week 8. The team is energized and ready to tackle these new challenges!
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
        <StyledNavButton to="/week6">
          &larr; Go Back to Week 6
        </StyledNavButton>
        <StyledNavButton to="/week8">
          Proceed to Week 8 &rarr;
        </StyledNavButton>
      </NavigationButtonsContainer>

      <ScrollToTop $visible={showScrollTop} onClick={scrollToTop}>
        <FaArrowUp />
      </ScrollToTop>
    </PageContainer>
  );
};

export default Week7;
