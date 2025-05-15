import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { FaHeart, FaLightbulb, FaArrowUp } from 'react-icons/fa'
import { BiHappy, BiSad } from 'react-icons/bi'
import { Link } from 'react-router-dom' // Added Link import

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
  font-size: 1rem; // Explicitly set to 16px
  position: relative;
  z-index: 1;
  background: ${({ theme }) => `linear-gradient(145deg, ${theme.surface}95, ${theme.surface}90)`};
`

const Paragraph = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-size: 1rem; // Explicitly set to 16px
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

const TooltipTerm = styled.span`
  text-decoration: underline dotted;
  cursor: help;
  position: relative;

  &:hover::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    padding: 8px;
    background: ${({ theme }) => theme.surface};
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: ${({ theme }) => theme.borderRadius};
    font-size: 0.875rem;
    white-space: nowrap;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
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
      transform: translate(0, 0);
      top: -4px;
      left: -4px;
    }
    25% {
      transform: translate(${({ theme }) => theme.animation.cornerLight.trail}, 0);
      top: -4px;
      left: calc(100% - 4px);
    }
    50% {
      transform: translate(${({ theme }) => theme.animation.cornerLight.trail}, ${({ theme }) => theme.animation.cornerLight.trail});
      top: calc(100% - 4px);
      left: calc(100% - 4px);
    }
    75% {
      transform: translate(0, ${({ theme }) => theme.animation.cornerLight.trail});
      top: calc(100% - 4px);
      left: -4px;
    }
    100% {
      transform: translate(0, 0);
      top: -4px;
      left: -4px;
    }
  }
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

const NavigationButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.md} 0;
`;

const StyledNavButton = styled(Link)`
  background-color: ${({ theme }) => theme.primary};
  color: #ffffff; // Ensuring text is white for better contrast on primary background
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

const Week1 = () => {
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
        <Title>Week 1: First Steps in OJT Journey</Title>
        <Date>February 03-07, 2025</Date>
      </Header>
      
      <Section>
        <SectionTitle>Introduction</SectionTitle>
        <Content>
          <Paragraph>
            Welcome to the first week of my On-the-Job Training experience! This week marks the 
            beginning of an exciting journey where I'll be applying classroom knowledge to real-world
            scenarios and growing both professionally and personally.
          </Paragraph>
          
          <Paragraph>
            The first week was primarily focused on orientation, getting to know the team, and 
            understanding the company's culture and expectations. I was both nervous and excited
            as I stepped into this new chapter of my academic journey.
          </Paragraph>
        </Content>
      </Section>
      
      <Section>
        <SectionTitle>Orientation and Project Briefing</SectionTitle>
        <Content>
          <Paragraph>
            Our mentor <Highlight>Sir Gerald</Highlight> gave us a comprehensive briefing about what 
            to expect during our training period. The highlight of the orientation was learning about 
            the project we'll be working on - <Highlight>BU HealthSync+</Highlight>.
          </Paragraph>
          
          <Paragraph>
            Sir Gerald explained that BU HealthSync+ will be a health monitoring and management system 
            designed to streamline health services within the university. This project aims to integrate 
            various health-related functions into a single, user-friendly platform accessible to students, 
            staff, and healthcare providers.
          </Paragraph>

          <Paragraph>
            One of the key aspects of BU HealthSync+ is that it will be developed for both <Highlight>Desktop and Mobile platforms</Highlight>. 
            The desktop version will be built using <TooltipTerm data-tooltip="A powerful PHP framework for web development">Laravel</TooltipTerm>, 
            a robust PHP framework known for its elegant syntax and powerful features. 
            Meanwhile, the mobile application, which I'll be working on, will be developed using 
            <TooltipTerm data-tooltip="A framework for building native mobile apps using React"> React Native</TooltipTerm>. 
            This <TooltipTerm data-tooltip="Write once, run on both iOS and Android">cross-platform framework</TooltipTerm> will 
            allow us to create a native-like experience for both iOS and Android users while 
            maintaining a single codebase.
          </Paragraph>
          
          <Paragraph>
            I was particularly excited to learn about the technical stack we'll be using and how my role 
            will contribute to the overall development of this innovative system. The briefing gave me 
            a clear understanding of the project's scope, objectives, and expected outcomes.
          </Paragraph>
        </Content>
      </Section>
      
      <Section>
        <SectionTitle>First Week Documentation</SectionTitle>
        <Content>
          <Paragraph>
            Below are some snapshots from my first week, including the orientation session, team 
            introductions, and initial project discussions:
          </Paragraph>
          
          <ImageGrid>
            <ImageContainer>
              <figure>
                <BlogImage 
                  src="/OJT/Week 1/image.png" 
                  alt="Week 1 Orientation"
                />
                <Caption>Orientation Session with the Development Team</Caption>
              </figure>
            </ImageContainer>
            
            <ImageContainer>
              <figure>
                <BlogImage 
                  src="/OJT/Week 1/image copy.png" 
                  alt="Project Briefing"
                />
                <Caption>Project Briefing for BU HealthSync+</Caption>
              </figure>
            </ImageContainer>
            
            <ImageContainer>
              <figure>
                <BlogImage 
                  src="/OJT/Week 1/image copy 2.png" 
                  alt="Team Introduction"
                />
                <Caption>Meeting with Team Members</Caption>
              </figure>
            </ImageContainer>
            
            <ImageContainer>
              <figure>
                <BlogImage 
                  src="/OJT/Week 1/image copy 3.png" 
                  alt="First Day at Office"
                />
                <Caption>First Day at the Office</Caption>
              </figure>
            </ImageContainer>
          </ImageGrid>
        </Content>
      </Section>
      
      <Section>
        <SectionTitle>Key Takeaways</SectionTitle>
        <Content>
          <Paragraph>
            My first week has been incredibly informative and has set a strong foundation for the 
            weeks to come. Here are my key takeaways:
          </Paragraph>
          
          <ul>
            <li>Understanding the company's workflow and communication channels</li>
            <li>Learning about the BU HealthSync+ project and its significance</li>
            <li>Getting familiar with the development environment and tools</li>
            <li>Building initial relationships with team members and mentors</li>
            <li>Setting personal learning goals for the duration of the OJT</li>
          </ul>
          
          <Paragraph>
            I'm looking forward to diving deeper into the technical aspects of the project in the 
            coming weeks and contributing meaningfully to the development of BU HealthSync+.
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
        <div>{/* Empty div for spacing, as there's no "Previous" button */}</div>
        <StyledNavButton to="/week2">Proceed to Week 2 →</StyledNavButton>
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

export default Week1