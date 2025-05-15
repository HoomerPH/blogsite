import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { FaHeart, FaLightbulb, FaArrowUp } from 'react-icons/fa'
import { BiHappy } from 'react-icons/bi'
import { Link } from 'react-router-dom' // Added Link import

// Styled components reused from Week2
const PageContainer = styled.div`
  margin: 0 auto;
  padding: 20px;
  max-width: 800px;
  font-family: Arial, sans-serif;
`
const Header = styled.header`
  text-align: center;
  margin-bottom: 40px;
`
const Title = styled.h1`
  font-size: 2.5em;
  margin: 0;
`
const Date = styled.p`
  font-size: 1.2em;
  color: #666;
`
const Section = styled.section`
  margin-bottom: 40px;
`
const SectionTitle = styled.h2`
  font-size: 2em;
  margin-bottom: 20px;
`
const Content = styled.div`
  font-size: 1.2em;
  line-height: 1.6;
`
const Paragraph = styled.p`
  margin-bottom: 20px;
`
const Highlight = styled.span`
  font-weight: bold;
`
const ImageGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 40px;
`
const ImageContainer = styled.div`
  flex: 1;
  min-width: 250px;
`
const BlogImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`
const Caption = styled.figcaption`
  text-align: center;
  font-size: 0.9em;
  color: #666;
  margin-top: 8px;
`
const ProgressBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: ${props => props.$width}%;
  height: 5px;
  background-color: #4caf50;
  z-index: 10;
`
const ReactionBar = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 40px;
`
const ReactionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  font-size: 1em;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  background-color: ${props => (props.$active ? '#4caf50' : '#e0e0e0')};
  color: ${props => (props.$active ? '#fff' : '#000')};
`
const ScrollToTop = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px;
  font-size: 1.5em;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  background-color: #4caf50;
  color: #fff;
  display: ${props => (props.$visible ? 'block' : 'none')};
`
const List = styled.ul`
  list-style-type: disc;
  padding-left: 20px;
`

// Added Navigation Button Styled Components
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

const Week3 = () => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [reactions, setReactions] = useState({
    helpful: 0,
    inspiring: 0,
    fun: 0
  })
  const [userReaction, setUserReaction] = useState(null)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setScrollProgress(progress)
      setShowScrollTop(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleReaction = (type) => {
    if (userReaction === type) {
      setReactions(prev => ({...prev, [type]: prev[type] - 1}))
      setUserReaction(null)
    } else {
      if (userReaction) {
        setReactions(prev => ({...prev, [userReaction]: prev[userReaction] - 1}))
      }
      setReactions(prev => ({...prev, [type]: prev[type] + 1}))
      setUserReaction(type)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <PageContainer>
      <ProgressBar $width={scrollProgress} />
      <Header>
        <Title>Week 3: Building Core Features & Team Collaboration</Title>
        <Date>February 17-21, 2025</Date>
      </Header>

      <Section>
        <SectionTitle>Feature Implementation Kickoff</SectionTitle>
        <Content>
          <Paragraph>
            The third week of my OJT journey marked the transition from setup to actual development. With our environments ready, we began implementing the core features of the BU HealthSync+ mobile application. This phase was both exciting and challenging, as it required translating project requirements into functional code.
          </Paragraph>
          <Paragraph>
            Our team started with the authentication module, ensuring secure login and registration for users. I contributed by integrating form validation and basic navigation between screens using React Navigation.
          </Paragraph>
        </Content>
      </Section>

      <Section>
        <SectionTitle>Team Collaboration & User Centric </SectionTitle>
        <Content>
          <Paragraph>
            This week, we adopted "User Centric" such as daily stand-ups and task boards to improve our workflow. Regular check-ins helped us stay aligned and quickly resolve blockers. I learned the importance of clear communication and documenting progress for the benefit of the whole team.
          </Paragraph>
          <Paragraph>
            We also held our first sprint review, where each member demonstrated their progress. It was motivating to see how our individual efforts contributed to the bigger picture.
          </Paragraph>
        </Content>
      </Section>

      <Section>
        <SectionTitle>Development Highlights</SectionTitle>
        <Content>
          <ImageGrid>
            <ImageContainer>
              <figure>
                <BlogImage 
                  src="/OJT/Week 3/image.png" 
                  alt="Sprint Planning Session"
                />
                <Caption>Thinking about all the workloads I have to do.</Caption>
              </figure>
            </ImageContainer>
            <ImageContainer>
              <figure>
                <BlogImage 
                  src="/OJT/Week 3/image copy.png" 
                  alt="Mobile App Authentication UI"
                />
                <Caption>Testing the Front End Screens for mobile.</Caption>
              </figure>
            </ImageContainer>
            <ImageContainer>
              <figure>
                <BlogImage 
                  src="/OJT/Week 3/image copy 2.png" 
                  alt="Team Collaboration"
                />
                <Caption>Team Collaboration and Code Review</Caption>
              </figure>
            </ImageContainer>
          </ImageGrid>
        </Content>
      </Section>

      <Section>
        <SectionTitle>Challenges & Solutions</SectionTitle>
        <Content>
          <Paragraph>
            As we delved into development, we encountered several challenges:
          </Paragraph>
          <List>
            <li><Highlight>Navigation:</Highlight> Integrating React Native (using Expo Router) Navigation and handling screen transitions smoothly</li>
            <li><Highlight>State Management:</Highlight> Deciding on the best approach for managing user state across the app</li>
            <li><Highlight>Code Merge Conflicts:</Highlight> Resolving merge issues during collaborative development</li>
            <li><Highlight>UI Consistency:</Highlight> Ensuring a unified look and feel across different devices</li>
          </List>
          <Paragraph>
            Through teamwork and open communication, we were able to address these issues and keep our momentum going.
          </Paragraph>
        </Content>
      </Section>

      <Section>
        <SectionTitle>Key Takeaways</SectionTitle>
        <Content>
          <List>
            <li>Gained hands-on experience with React Native navigation and authentication flows</li>
            <li>Learned the value of agile practices and regular team check-ins</li>
            <li>Improved collaboration skills through code reviews and pair programming</li>
            <li>Developed problem-solving strategies for real-world development challenges</li>
          </List>
          <Paragraph>
            Week 3 has been a pivotal point in my OJT, as I moved from setup to actual feature development. I'm looking forward to building more advanced features and deepening my understanding of mobile app development in the coming weeks.
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
        <StyledNavButton to="/week2">← Go Back to Week 2</StyledNavButton>
        <StyledNavButton to="/week4">Proceed to Week 4 →</StyledNavButton>
      </NavigationButtonsContainer>

      <ScrollToTop 
        onClick={scrollToTop} 
        $visible={showScrollTop}
        aria-label="Scroll to top"
      >
        <FaArrowUp />
      </ScrollToTop>
    </PageContainer>
  )
}

export default Week3