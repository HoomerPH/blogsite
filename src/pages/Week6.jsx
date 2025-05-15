import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { FaHeart, FaLightbulb, FaArrowUp, FaUsers, FaChartLine, FaCode } from 'react-icons/fa';
import { BiHappy } from 'react-icons/bi';
import { Link } from 'react-router-dom';

// Styled components (can be reused or adapted from other week pages)
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
  overflow: hidden; /* Changed from visible to hidden for cleaner look */
  background: ${({ theme }) => `linear-gradient(145deg, ${theme.surface}90, ${theme.surface}60)`};
  backdrop-filter: blur(8px); /* Slightly reduced blur */
  border: 1px solid ${({ theme }) => `${theme.border}30`}; /* Softer border */
  transition: ${({ theme }) => theme.transition};
  position: relative;

  &:hover {
    transform: scale(1.03); /* Slightly increased hover scale */
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15); /* Enhanced shadow */
  }
`;

const BlogImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  display: block; /* Added for better image handling */
`;

const Caption = styled.figcaption`
  padding: ${({ theme }) => theme.spacing.sm};
  text-align: center;
  color: ${({ theme }) => theme.textSecondary};
  ${({ theme }) => theme.typography.small}
  background-color: ${({ theme }) => `${theme.surface}90`}; /* Slightly different background */
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
      content: '✓'; /* Changed bullet point */
      color: ${({ theme }) => theme.primary};
      font-weight: bold;
      position: absolute;
      left: 0;
      top: 1px; /* Adjusted for better alignment */
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

const Week6 = () => {
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
    setReactions(prev => {
      const newReactions = { ...prev };
      if (userReaction === type) { // User is deselecting
        newReactions[type] = Math.max(0, newReactions[type] - 1);
        setUserReaction(null);
      } else { // User is selecting a new reaction
        if (userReaction) { // Deselect previous reaction if any
          newReactions[userReaction] = Math.max(0, newReactions[userReaction] - 1);
        }
        newReactions[type] = newReactions[type] + 1;
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
            <Title>Week 6: Iteration and Optimization</Title>
            <Date>March 3-7, 2025</Date>
        </Header>

        <Section>
            <SectionTitle><FaUsers /> Team Collaboration and Sprint Planning</SectionTitle>
            <Content>
                <Paragraph>
                    Week 6 kicked off with a productive team meeting where we reviewed the progress from the previous sprint and planned for the upcoming tasks. 
                    The primary focus was on the <Highlight>Patient Dashboard</Highlight>, a critical component of the BU HealthSync+ desktop application.
                </Paragraph>
                <Paragraph>
                    We broke down the remaining features for the dashboard into smaller, manageable tasks and assigned them to team members. 
                    This collaborative planning session ensured everyone was on the same page and understood their responsibilities for the week.
                </Paragraph>
            </Content>
        </Section>

        <Section>
            <SectionTitle><FaChartLine /> Patient Dashboard Optimization</SectionTitle>
            <Content>
                <Paragraph>
                    A significant portion of this week was dedicated to optimizing the Patient Dashboard. 
                    We identified some performance bottlenecks, particularly in data loading and rendering for large datasets.
                </Paragraph>
                <List>
                    <li>Implemented <Highlight>lazy loading</Highlight> for certain components to improve initial load time.</li>
                    <li>Refactored state management logic for better efficiency and predictability.</li>
                    <li>Optimized database queries to fetch patient data more quickly.</li>
                    <li>Refined UI elements for a smoother and more responsive user experience.</li>
                </List>
                <Paragraph>
                    These optimizations were crucial for ensuring the dashboard is not only functional but also performs well under real-world usage scenarios.
                </Paragraph>
            </Content>
        </Section>

        <Section>
            <SectionTitle><FaCode /> Development Progress & Visuals</SectionTitle>
            <Content>
                <Paragraph>
                    Here's a glimpse of our work this week:
                </Paragraph>
                <ImageGrid>
                    <ImageContainer>
                        <figure>
                            <BlogImage src="/OJT/Week 6/image.png" alt="Optimized Patient Dashboard UI" />
                            <Caption>Optimized Patient Dashboard UI </Caption>
                        </figure>
                    </ImageContainer>
                    <ImageContainer>
                        <figure>
                            <BlogImage src="/OJT/Week 6/image copy.png" alt="Team Meeting and Sprint Planning" />
                            <Caption>Team Meeting and Sprint Planning </Caption>
                        </figure>
                    </ImageContainer>
                    <ImageContainer>
                        <figure>
                            <BlogImage src="/OJT/Week 6/image copy 2.png" alt="Code Refactoring" />
                            <Caption>Code Refactoring for Performance</Caption>
                        </figure>
                    </ImageContainer>
                </ImageGrid>
            </Content>
        </Section>

        <Section>
            <SectionTitle>Challenges and Learning Points</SectionTitle>
            <Content>
                <Paragraph>
                    This week brought its own set of challenges and valuable learning experiences:
                </Paragraph>
                <List>
                    <li><Highlight>Performance Bottlenecks:</Highlight> Identifying and resolving performance issues required careful profiling and debugging.</li>
                    <li><Highlight>State Management Complexity:</Highlight> Managing complex state in a large application like the dashboard can be tricky, reinforcing the need for robust patterns.</li>
                    <li><Highlight>Iterative Development:</Highlight> The process of optimizing and refining features highlighted the importance of iterative development and continuous feedback.</li>
                </List>
            </Content>
        </Section>

        <Section>
            <SectionTitle>Key Takeaways</SectionTitle>
            <Content>
                <Paragraph>
                    Week 6 was all about refinement and teamwork. The key takeaways include:
                </Paragraph>
                <List>
                    <li>The critical role of <Highlight>team communication</Highlight> and collaborative planning in tackling complex tasks.</li>
                    <li>Continuous <Highlight>performance optimization</Highlight> is an ongoing process, not a one-time fix.</li>
                    <li>Adapting to new challenges and learning from them is essential for growth as a developer.</li>
                </List>
                <Paragraph>
                    With the Patient Dashboard now more robust and performant, we're well-positioned to move on to the next set of features in Week 7.
                </Paragraph>
            </Content>
        </Section>

        <ReactionBar>
            <ReactionButton onClick={() => handleReaction('helpful')} $active={userReaction === 'helpful'}>
                <FaLightbulb /> Helpful {reactions.helpful > 0 && reactions.helpful}
            </ReactionButton>
            <ReactionButton onClick={() => handleReaction('inspiring')} $active={userReaction === 'inspiring'}>
                <FaHeart /> Inspiring {reactions.inspiring > 0 && reactions.inspiring}
            </ReactionButton>
            <ReactionButton onClick={() => handleReaction('fun')} $active={userReaction === 'fun'}>
                <BiHappy /> Fun {reactions.fun > 0 && reactions.fun}
            </ReactionButton>
        </ReactionBar>

        <NavigationButtonsContainer>
            <StyledNavButton to="/week5">← Go Back to Week 5</StyledNavButton>
            <StyledNavButton to="/week7">Proceed to Week 7 →</StyledNavButton>
        </NavigationButtonsContainer>

        <ScrollToTop onClick={scrollToTop} $visible={showScrollTop} aria-label="Scroll to top">
            <FaArrowUp />
        </ScrollToTop>
    </PageContainer>
);
};

export default Week6;
