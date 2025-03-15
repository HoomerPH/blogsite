import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { FaHeart, FaLightbulb, FaArrowUp } from 'react-icons/fa'
import { BiHappy, BiSad } from 'react-icons/bi'

// Reuse the styled components from Week1
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
  position: relative;
`

const Header = styled.header`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const Title = styled.h1`
  color: ${({ theme }) => theme.primary};
  ${({ theme }) => theme.typography.h1}
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const Date = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  ${({ theme }) => theme.typography.small}
  font-style: italic;
`

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
    0% {
      top: -5px;
      left: -5px;
    }
    25% {
      top: -5px;
      left: calc(100% - 5px);
    }
    50% {
      top: calc(100% - 5px);
      left: calc(100% - 5px);
    }
    75% {
      top: calc(100% - 5px);
      left: -5px;
    }
    100% {
      top: -5px;
      left: -5px;
    }
  }
`

const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.text};
  ${({ theme }) => theme.typography.h2}
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding-bottom: ${({ theme }) => theme.spacing.xs};
  border-bottom: 2px solid ${({ theme }) => theme.primary};
`

const Content = styled.div`
  color: ${({ theme }) => theme.text};
  ${({ theme }) => theme.typography.body}
  line-height: 1.8;
  position: relative;
  z-index: 1;
  background: ${({ theme }) => `linear-gradient(145deg, ${theme.surface}95, ${theme.surface}90)`};
`

const Paragraph = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-size: 1rem;
  line-height: 1.8;
`

const Highlight = styled.span`
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
`

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin: ${({ theme }) => theme.spacing.xl} 0;
`

const ImageContainer = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius};
  overflow: visible;
  background: ${({ theme }) => `linear-gradient(145deg, ${theme.surface}90, ${theme.surface}60)`};
  backdrop-filter: blur(10px);
  border: 1px solid ${({ theme }) => `${theme.border}40`};
  transition: ${({ theme }) => theme.transition};
  position: relative;

  &:hover {
    transform: scale(1.02);
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
`

const BlogImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  transition: ${({ theme }) => theme.transition};
  position: relative;
  z-index: 1;
  
  &:hover {
    transform: scale(1.03);
  }
`

const Caption = styled.figcaption`
  padding: ${({ theme }) => theme.spacing.sm};
  text-align: center;
  color: ${({ theme }) => theme.textSecondary};
  ${({ theme }) => theme.typography.small}
  background-color: ${({ theme }) => theme.surface};
`

const ProgressBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: ${props => props.$width}%;
  height: 4px;
  background: ${({ theme }) => theme.primary};
  z-index: 1000;
  transition: width 0.2s ease;
`

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
  position: relative;
  overflow: visible;
`

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
`

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
`

const CodeBlock = styled.pre`
  background: ${({ theme }) => `${theme.surface}90`};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius};
  overflow-x: auto;
  margin: ${({ theme }) => theme.spacing.md} 0;
  border: 1px solid ${({ theme }) => `${theme.border}40`};
  
  code {
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
    line-height: 1.5;
  }
`

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
`

const Week2 = () => {
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
        <Title>Week 2: Deep Diving into Development</Title>
        <Date>February 10-14, 2025</Date>
      </Header>
      
      <Section>
        <SectionTitle>Project Setup and Environment Configuration</SectionTitle>
        <Content>
          <Paragraph>
            The second week of my OJT journey focused on setting up the development environment 
            for the BU HealthSync+ project. After the initial orientation and project briefing 
            from Week 1, we dove straight into the technical aspects of the project.
          </Paragraph>
          
          <Paragraph>
            Under the guidance of <Highlight>Sir Gerald</Highlight>, we began by setting up our 
            local development environments with all the necessary tools and frameworks required 
            for both the desktop and mobile applications.
          </Paragraph>
        </Content>
      </Section>

      <Section>
        <SectionTitle>Technical Stack Overview</SectionTitle>
        <Content>
          <Paragraph>
            This week, we focused on understanding and setting up the technical stack for both 
            parts of the BU HealthSync+ project:
          </Paragraph>
          
          <List>
            <li>
              <Highlight>Desktop Application (Laravel):</Highlight>
              {" "}Setup of PHP 8.2, Composer, and Laravel 10
            </li>
            <li>
              <Highlight>Mobile Application (React Native):</Highlight>
              {" "}Configuration of Node.js, React Native CLI, and Android Studio
            </li>
            <li>
              <Highlight>Database:</Highlight>
              {" "}MySQL setup and initial schema design
            </li>
            <li>
              <Highlight>Version Control:</Highlight>
              {" "}Git repository setup and branching strategy
            </li>
          </List>

          <CodeBlock>
            <code>
              # Project Structure{"\n"}
              bu-healthsync/{"\n"}
              ├── desktop/           # Laravel application{"\n"}
              ├── mobile/           # React Native application{"\n"}
              └── docs/             # Project documentation
            </code>
          </CodeBlock>
        </Content>
      </Section>
      
      <Section>
        <SectionTitle>Development Progress</SectionTitle>
        <Content>
          <ImageGrid>
            <ImageContainer>
              <figure>
                <BlogImage 
                  src="/OJT/Week 2/image.png" 
                  alt="Environment Setup"
                />
                <Caption>Setting up the development environment</Caption>
              </figure>
            </ImageContainer>
            
            <ImageContainer>
              <figure>
                <BlogImage 
                  src="/OJT/Week 2/image copy.png" 
                  alt="Code Implementation"
                />
                <Caption>Initial code implementation</Caption>
              </figure>
            </ImageContainer>
            
            <ImageContainer>
              <figure>
                <BlogImage 
                  src="/OJT/Week 2/image copy 2.png" 
                  alt="Team Discussion"
                />
                <Caption>Team discussion on architecture design</Caption>
              </figure>
            </ImageContainer>
          </ImageGrid>
        </Content>
      </Section>
      
      <Section>
        <SectionTitle>Challenges and Learning Points</SectionTitle>
        <Content>
          <Paragraph>
            This week presented several challenges that provided valuable learning opportunities:
          </Paragraph>
          
          <List>
            <li>
              <Highlight>Cross-Platform Development:</Highlight>
              {" "}Understanding the nuances of developing for both iOS and Android platforms
            </li>
            <li>
              <Highlight>Environment Setup:</Highlight>
              {" "}Resolving various configuration issues and dependencies
            </li>
            <li>
              <Highlight>Version Control:</Highlight>
              {" "}Learning Git workflow and best practices for team collaboration
            </li>
            <li>
              <Highlight>API Integration:</Highlight>
              {" "}Planning the integration between mobile and desktop applications
            </li>
          </List>
        </Content>
      </Section>

      <Section>
        <SectionTitle>Key Takeaways</SectionTitle>
        <Content>
          <Paragraph>
            Week 2 has been instrumental in building a solid foundation for the project:
          </Paragraph>
          
          <List>
            <li>Gained practical experience with professional development tools and workflows</li>
            <li>Learned the importance of proper environment setup and configuration</li>
            <li>Understood the significance of documentation in team projects</li>
            <li>Improved problem-solving skills through troubleshooting setup issues</li>
          </List>
          
          <Paragraph>
            Looking ahead to Week 3, I'm excited to start implementing the core features of 
            the mobile application and working more closely with the team on integrated 
            components.
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

export default Week2