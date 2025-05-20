import React, { useState, useEffect, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { Link } from 'react-router-dom';
import { FaHeart, FaLightbulb, FaArrowUp, FaChartLine, FaCheckCircle, FaBookOpen, FaGraduationCap, FaTasks, FaHandshake, FaUserTie } from 'react-icons/fa';
import { BiHappy } from 'react-icons/bi';

// Styled Components (reused and adapted from previous weeks for consistency)
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

const VideoContainer = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius};
  overflow: hidden;
  background: ${({ theme }) => `linear-gradient(145deg, ${theme.surface}90, ${theme.surface}60)`};
  backdrop-filter: blur(8px);
  border: 1px solid ${({ theme }) => `${theme.border}30`};
  margin: ${({ theme }) => theme.spacing.xl} 0;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
`;

const Video = styled.video`
  width: 100%;
  height: auto;
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
      content: '🏆'; 
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
  border: 1px solid ${({ theme, $active }) => $active ? theme.primary : theme.border};

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
`;

const CertificateContainer = styled.div`
  border: 3px dashed ${({ theme }) => theme.primary};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  margin: ${({ theme }) => theme.spacing.xl} 0;
  background: ${({ theme }) => `linear-gradient(145deg, ${theme.surface}95, ${theme.surface}80)`};
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
`;

const CertificateTitle = styled.h3`
  color: ${({ theme }) => theme.primary};
  ${({ theme }) => theme.typography.h3}
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const CertificateText = styled.p`
  font-style: italic;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Signature = styled.div`
  font-family: 'Brush Script MT', cursive;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.primary};
  margin-top: ${({ theme }) => theme.spacing.lg};
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

const Week11 = () => {
  const theme = useContext(ThemeContext);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [reactions, setReactions] = useState({ helpful: 0, inspiring: 0, cheers: 0 });
  const [userReaction, setUserReaction] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const currentScroll = window.scrollY;
      setScrollProgress((currentScroll / totalHeight) * 100);
      setShowScrollTop(currentScroll > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleReaction = (type) => {
    setReactions(prev => ({
      ...prev,
      [type]: userReaction === type ? prev[type] - 1 : (userReaction ? prev[type] : prev[type] + 1) // Allow un-reacting
    }));
    setUserReaction(prev => (prev === type ? null : type));
  };
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <PageContainer>
      <ProgressBar $width={scrollProgress} />
      <Header>
        <Title>Week 11: Final Presentation and Completion</Title>
        <Date>May 10 - May 17, 2025</Date>
      </Header>

      <Section>
        <SectionTitle><FaTasks /> Preparing the Final Presentation</SectionTitle>
        <Content>
          <Paragraph>
            The final week of my On-the-Job Training arrived! The main focus was on preparing and delivering my <Highlight>final presentation</Highlight> to Sir Michael. This presentation was not just a formality—it was a mandatory requirement for completing my OJT program and receiving my signed completion form.
          </Paragraph>
          <Paragraph>
            I spent the first few days compiling all my contributions to the BU HealthSync+ project and organizing them into a comprehensive presentation. The preparation process involved:
          </Paragraph>
          <List>
            <li>Gathering screenshots and code samples from key features I developed.</li>
            <li>Organizing my work into logical sections: database design, UI implementation, API integration, etc.</li>
            <li>Creating slide decks that clearly demonstrated my contributions.</li>
            <li>Preparing a brief demo of the features I implemented.</li>
            <li>Practicing my presentation multiple times to ensure clarity and confidence.</li>
          </List>
        </Content>
      </Section>

      <ImageGrid>
        <ImageContainer>
          <BlogImage src="/Week 11/image.png" alt="Presentation slide showing project timeline" />
          <Caption>Preparing my presentation slides summarizing the 11-week journey</Caption>
        </ImageContainer>
        <ImageContainer>
          <BlogImage src="/Week 11/image copy.png" alt="Code contributions and feature implementations" />
          <Caption>Highlighting key code contributions and feature implementations</Caption>
        </ImageContainer>
      </ImageGrid>

      <Section>
        <SectionTitle><FaChartLine /> Summarizing My Contributions</SectionTitle>
        <Content>
          <Paragraph>
            A significant part of my presentation focused on summarizing my contributions to the BU HealthSync+ project over the past 11 weeks. Here's a brief overview of what I showcased:
          </Paragraph>
          <List>
            <li><Highlight>Database Schema Design:</Highlight> Helped design and implement the core database structure for users, profiles, appointments, and medical records.</li>
            <li><Highlight>User Authentication:</Highlight> Implemented secure login and registration functionality for the mobile application.</li>
            <li><Highlight>Patient Dashboard:</Highlight> Designed and developed the UI for the patient dashboard, featuring appointment management and health information display.</li>
            <li><Highlight>API Integration:</Highlight> Implemented data fetching using Axios to connect the mobile client with backend services.</li>
            <li><Highlight>User Profile Management:</Highlight> Created the profile editing functionality for patients to update their personal and medical information.</li>
            <li><Highlight>Testing & Optimization:</Highlight> Conducted testing and performance optimization for key features.</li>
          </List>
          <Paragraph>
            I made sure to emphasize both the technical skills I applied and the soft skills I developed, such as team collaboration, project planning, and adaptive problem-solving.
          </Paragraph>
        </Content>
      </Section>

      <Section>
        <SectionTitle><FaUserTie /> The Presentation to Sir Michael</SectionTitle>
        <Content>
          <Paragraph>
            On Thursday, I delivered my final presentation to Sir Michael and a few other team members. The presentation lasted about 30 minutes, followed by a 15-minute Q&A session. I walked through my journey from orientation to final implementation, highlighting challenges faced and lessons learned along the way.
          </Paragraph>
          <Paragraph>
            Sir Michael asked several insightful questions about my design decisions and implementation approaches. I was pleased to be able to answer confidently, drawing on the knowledge I'd gained throughout the internship. He seemed particularly impressed with my work on the API integration using Axios and the responsive design of the patient dashboard.
          </Paragraph>
        </Content>
      </Section>

      <VideoContainer>
        <Video controls>
          <source src="/Week 11/presentation-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </Video>
        <Caption>A clip from my final presentation to Sir Michael and the team</Caption>
      </VideoContainer>

      <Section>
        <SectionTitle><FaHandshake /> Completion and Reflections</SectionTitle>
        <Content>
          <Paragraph>
            After the presentation, Sir Michael officially signed my OJT completion form, marking the successful conclusion of my internship! The team also held a small celebration to mark the occasion and wish me well on my future endeavors.
          </Paragraph>
          <Paragraph>
            Reflecting on these 11 weeks, I'm amazed at how much I've grown both technically and professionally. Some key takeaways from this experience include:
          </Paragraph>
          <List>
            <li>The invaluable experience of working on a real-world project with actual stakeholders and constraints.</li>
            <li>Practical knowledge of the full development cycle, from planning to implementation to testing.</li>
            <li>The importance of communication and collaboration within a development team.</li>
            <li>Technical skills in React, React Native, database design, and API integration that go far beyond what classroom learning could provide.</li>
            <li>The confidence to tackle complex problems and the humility to seek help when needed.</li>
          </List>
          <Paragraph>
            This OJT experience has been transformative, bridging the gap between academic knowledge and professional practice. I'm grateful for the mentorship, the challenges, and the opportunity to contribute to a meaningful project that will help the Bicol University community.
          </Paragraph>
        </Content>
      </Section>

      <ImageContainer>
        <BlogImage src="/Week 11/image copy 2.png" alt="Team celebration after the final presentation" />
        <Caption>Celebrating with the team after completing my OJT requirements</Caption>
      </ImageContainer>
      
      <Section>
        <SectionTitle><FaGraduationCap /> Looking Ahead</SectionTitle>
        <Content>
          <Paragraph>
            As this chapter closes, I'm excited about what lies ahead. The skills and experience gained during this OJT will be invaluable as I move forward in my career. I've already updated my resume with my contributions to BU HealthSync+ and feel much more confident about entering the job market after graduation.
          </Paragraph>
          <Paragraph>
            I'm particularly enthusiastic about continuing to develop my skills in React Native and API integration, areas where I found I have both aptitude and interest. Who knows, perhaps there's a future opportunity to continue contributing to BU HealthSync+ or similar healthcare technology solutions!
          </Paragraph>
          <Paragraph>
            Thank you for following my OJT journey through these weekly blog posts. I hope they've provided insight into what a real-world internship experience looks like, with all its challenges, learnings, and rewards.
          </Paragraph>
        </Content>
      </Section>

      <ReactionBar>
        <ReactionButton $active={userReaction === 'helpful'} onClick={() => handleReaction('helpful')}>
          <FaLightbulb /> {reactions.helpful} Helpful
        </ReactionButton>
        <ReactionButton $active={userReaction === 'inspiring'} onClick={() => handleReaction('inspiring')}>
          <FaHeart /> {reactions.inspiring} Inspiring
        </ReactionButton>
        <ReactionButton $active={userReaction === 'cheers'} onClick={() => handleReaction('cheers')}>
          <BiHappy /> {reactions.cheers} Cheers!
        </ReactionButton>
      </ReactionBar>

      <NavigationButtonsContainer>
        <StyledNavButton to="/week10">
          &larr; Previous Week
        </StyledNavButton>
        <div></div> {/* Empty div to maintain spacing with flexbox */}
      </NavigationButtonsContainer>

      {showScrollTop && (
        <ScrollToTop $visible={showScrollTop} onClick={scrollToTop} aria-label="Scroll to top">
          <FaArrowUp />
        </ScrollToTop>
      )}
    </PageContainer>
  );
};

export default Week11;